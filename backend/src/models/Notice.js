import mongoose from 'mongoose';

const noticeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ['General', 'Exams', 'Admissions', 'Events', 'Academics'],
      default: 'General',
    },
    targetSemester: {
      type: String,
      enum: ['ALL', '1', '2', '3', '4', '5', '6', '7', '8'],
      default: 'ALL',
    },
    isUrgent: { type: Boolean, default: false },
    pdfUrl: { type: String, default: null },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postedByRole: { type: String, required: true },
    department: { type: String, default: 'Administration' },
  },
  { timestamps: true }
);

export default mongoose.model('Notice', noticeSchema);