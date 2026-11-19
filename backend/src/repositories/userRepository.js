import User from '../models/User.js';

export const findByEmail = (email) => User.findOne({ email });

export const findById = (id) => User.findById(id).select('-password');

export const createUser = (userData) => User.create(userData);

export const findAllHods = () =>
  User.find({ role: 'hod' }).select('-password').sort({ createdAt: -1 });

export const updateUserStatus = (id, status) =>
  User.findByIdAndUpdate(id, { status }, { new: true }).select('-password');

export const deleteUserById = (id) => User.findByIdAndDelete(id);