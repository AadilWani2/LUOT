import jwt from 'jsonwebtoken';
import * as userRepo from '../repositories/userRepository.js';

const generateToken = (id, role) =>
  jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: '7d' });

const formatUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  department: user.department,
  rollNumber: user.rollNumber,
  semester: user.semester,
  status: user.status,
});

export const registerUser = async (data) => {
  const { name, email, password, role, department, rollNumber, semester } = data;

  if (role === 'super_admin') {
    const err = new Error('Principal accounts cannot be created via public registration.');
    err.statusCode = 403;
    throw err;
  }

  const existing = await userRepo.findByEmail(email);
  if (existing) {
    const err = new Error('An account with this email already exists.');
    err.statusCode = 400;
    throw err;
  }

  const user = await userRepo.createUser({
    name,
    email,
    password,
    role,
    department,
    rollNumber: role === 'student' ? rollNumber : undefined,
    semester: role === 'student' ? Number(semester) : undefined,
    status: role === 'hod' ? 'pending' : 'approved',
  });

  if (user.role === 'hod') {
    return {
      pendingApproval: true,
      message: 'HOD registration submitted. Waiting for Principal approval before you can log in.',
      user: formatUser(user),
    };
  }

  return {
    pendingApproval: false,
    token: generateToken(user._id, user.role),
    user: formatUser(user),
  };
};

export const loginUser = async ({ email, password, portal }) => {
  const user = await userRepo.findByEmail(email);
  if (!user || !(await user.matchPassword(password))) {
    const err = new Error('Invalid email or password.');
    err.statusCode = 401;
    throw err;
  }

  if (portal === 'student' && user.role !== 'student') {
    const err = new Error('Please use the Faculty / Principal Login portal.');
    err.statusCode = 403;
    throw err;
  }

  if (portal === 'faculty' && user.role === 'student') {
    const err = new Error('Please use the Student Login portal.');
    err.statusCode = 403;
    throw err;
  }

  if (user.status === 'pending') {
    const err = new Error('Your HOD account is pending Principal approval.');
    err.statusCode = 403;
    throw err;
  }

  if (user.status === 'rejected') {
    const err = new Error('Your HOD registration was rejected by the Principal.');
    err.statusCode = 403;
    throw err;
  }

  return {
    token: generateToken(user._id, user.role),
    user: formatUser(user),
  };
};