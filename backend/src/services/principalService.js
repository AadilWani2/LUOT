import * as userRepo from '../repositories/userRepository.js';

export const listAllHods = async () => {
  return await userRepo.findAllHods();
};

export const setHodStatus = async (hodId, status) => {
  if (!['approved', 'rejected'].includes(status)) {
    const err = new Error('Invalid status. Must be approved or rejected.');
    err.statusCode = 400;
    throw err;
  }
  const updated = await userRepo.updateUserStatus(hodId, status);
  if (!updated) {
    const err = new Error('HOD account not found.');
    err.statusCode = 404;
    throw err;
  }
  return updated;
};

export const addHodDirectly = async ({ name, email, password, department }) => {
  const existing = await userRepo.findByEmail(email);
  if (existing) {
    const err = new Error('An account with this email already exists.');
    err.statusCode = 400;
    throw err;
  }

  const hod = await userRepo.createUser({
    name,
    email,
    password,
    role: 'hod',
    department,
    status: 'approved',
  });

  return {
    _id: hod._id,
    name: hod.name,
    email: hod.email,
    role: hod.role,
    department: hod.department,
    status: hod.status,
  };
};

export const removeHod = async (hodId) => {
  const deleted = await userRepo.deleteUserById(hodId);
  if (!deleted) {
    const err = new Error('HOD account not found.');
    err.statusCode = 404;
    throw err;
  }
  return { message: 'HOD removed successfully.' };
};