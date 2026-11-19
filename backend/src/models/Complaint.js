import mongoose from 'mongoose';

const complaintSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    department: { type: String, required: true },
    semester: { type: Number, required: true },
    category: {
      type: String,
      enum: ['Academics', 'Infrastructure', 'Hostel', 'Examination', 'General'],
      required: true,
    },
    subject: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['Pending', 'In Review', 'Resolved'],
      default: 'Pending',
    },
    adminRemarks: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model('Complaint', complaintSchema);