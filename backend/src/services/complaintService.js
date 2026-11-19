import * as complaintRepo from '../repositories/complaintRepository.js';

export const submitComplaint = async (data, student) => {
  return await complaintRepo.createComplaint({
    student: student._id,
    department: student.department,
    semester: student.semester,
    category: data.category,
    subject: data.subject,
    description: data.description,
  });
};

export const getStudentComplaints = async (studentId) => {
  return await complaintRepo.findByStudent(studentId);
};

export const getComplaintsForAdmin = async (user) => {
  const filter = user.role === 'hod' ? { department: user.department } : {};
  return await complaintRepo.findAllComplaints(filter);
};

export const updateComplaint = async (id, { status, adminRemarks }) => {
  const updated = await complaintRepo.updateComplaintStatus(id, { status, adminRemarks });
  if (!updated) {
    const err = new Error('Complaint not found.');
    err.statusCode = 404;
    throw err;
  }
  return updated;
};