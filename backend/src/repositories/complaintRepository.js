import Complaint from '../models/Complaint.js';

export const createComplaint = (data) => Complaint.create(data);

export const findByStudent = (studentId) =>
  Complaint.find({ student: studentId }).sort({ createdAt: -1 });

export const findAllComplaints = (filter = {}) =>
  Complaint.find(filter)
    .sort({ createdAt: -1 })
    .populate('student', 'name rollNumber email semester department');

export const updateComplaintStatus = (id, { status, adminRemarks }) =>
  Complaint.findByIdAndUpdate(
    id,
    { status, adminRemarks },
    { new: true }
  ).populate('student', 'name rollNumber email semester department');