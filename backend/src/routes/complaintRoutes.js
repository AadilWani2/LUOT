import express from 'express';
import {
  createComplaint,
  getMyComplaints,
  getAdminComplaints,
  updateComplaintStatus,
} from '../controllers/complaintController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';

const router = express.Router();

router.post('/', protect, authorizeRoles('student'), createComplaint);
router.get('/my', protect, authorizeRoles('student'), getMyComplaints);
router.get('/admin', protect, authorizeRoles('hod', 'super_admin'), getAdminComplaints);
router.patch('/:id', protect, authorizeRoles('hod', 'super_admin'), updateComplaintStatus);

export default router;