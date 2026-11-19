import Notice from '../models/Notice.js';

export const createNotice = (data) => Notice.create(data);

export const findPublicNotices = () =>
  Notice.find({ targetSemester: 'ALL' })
    .sort({ isUrgent: -1, createdAt: -1 })
    .populate('postedBy', 'name role department');

export const findNoticesForStudent = (semester) =>
  Notice.find({
    targetSemester: { $in: ['ALL', String(semester)] },
  })
    .sort({ isUrgent: -1, createdAt: -1 })
    .populate('postedBy', 'name role department');

export const findAllNotices = () =>
  Notice.find()
    .sort({ isUrgent: -1, createdAt: -1 })
    .populate('postedBy', 'name role department');

export const findNoticeById = (id) => Notice.findById(id);

export const deleteNoticeById = (id) => Notice.findByIdAndDelete(id);