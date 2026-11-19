import * as noticeRepo from '../repositories/noticeRepository.js';
import { uploadPdfToCloudinary } from '../config/cloudinary.js';

export const getPublicNotices = async () => {
  return await noticeRepo.findPublicNotices();
};

export const getStudentNotices = async (semester) => {
  return await noticeRepo.findNoticesForStudent(semester);
};

export const getAllNoticesForAdmin = async () => {
  return await noticeRepo.findAllNotices();
};

export const publishNotice = async (data, user, file) => {
  let pdfUrl = null;

  if (file) {
    pdfUrl = await uploadPdfToCloudinary(file.buffer, file.originalname);
  }

  return await noticeRepo.createNotice({
    title: data.title,
    content: data.content,
    category: data.category || 'General',
    targetSemester: data.targetSemester || 'ALL',
    isUrgent: data.isUrgent === 'true' || data.isUrgent === true,
    pdfUrl,
    postedBy: user._id,
    postedByRole: user.role === 'super_admin' ? 'Principal' : 'HOD',
    department: user.department || 'Administration',
  });
};

export const removeNotice = async (noticeId, user) => {
  const notice = await noticeRepo.findNoticeById(noticeId);
  if (!notice) {
    const err = new Error('Notice not found.');
    err.statusCode = 404;
    throw err;
  }

  if (user.role !== 'super_admin' && notice.postedBy.toString() !== user._id.toString()) {
    const err = new Error('You can only delete notices you published.');
    err.statusCode = 403;
    throw err;
  }

  await noticeRepo.deleteNoticeById(noticeId);
  return { message: 'Notice deleted successfully.' };
};