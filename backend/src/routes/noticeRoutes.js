import express from 'express';
import {
  getPublicNotices,
  getMyNotices,
  createNotice,
  deleteNotice,
} from '../controllers/noticeController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorizeRoles } from '../middlewares/roleMiddleware.js';
import { uploadNoticePdf } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

router.get('/public', getPublicNotices);
router.get('/my', protect, getMyNotices);
router.post(
  '/',
  protect,
  authorizeRoles('hod', 'super_admin'),
  uploadNoticePdf.single('pdf'),
  createNotice
);
router.delete('/:id', protect, authorizeRoles('hod', 'super_admin'), deleteNotice);

export default router;