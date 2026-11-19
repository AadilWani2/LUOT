import * as noticeService from '../services/noticeService.js';

export const getPublicNotices = async (req, res) => {
  try {
    const notices = await noticeService.getPublicNotices();
    res.status(200).json(notices);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const getMyNotices = async (req, res) => {
  try {
    if (req.user.role === 'student') {
      const notices = await noticeService.getStudentNotices(req.user.semester);
      return res.status(200).json(notices);
    }
    const notices = await noticeService.getAllNoticesForAdmin();
    res.status(200).json(notices);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    const notice = await noticeService.publishNotice(req.body, req.user, req.file);
    res.status(201).json(notice);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    const result = await noticeService.removeNotice(req.params.id, req.user);
    res.status(200).json(result);
  } catch (err) {
    res.status(err.statusCode || 500).json({ message: err.message });
  }
};