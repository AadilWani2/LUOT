import * as complaintService from '../services/complaintService.js';

export const createComplaint = async (req, res) => {
  try {
    const complaint = await complaintService.submitComplaint(req.body, req.user);
    res.status(201).json(complaint);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getMyComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getStudentComplaints(req.user._id);
    res.status(200).json(complaints);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getAdminComplaints = async (req, res) => {
  try {
    const complaints = await complaintService.getComplaintsForAdmin(req.user);
    res.status(200).json(complaints);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const updateComplaintStatus = async (req, res) => {
  try {
    const updated = await complaintService.updateComplaint(req.params.id, req.body);
    res.status(200).json(updated);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};