import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: {
      type: String,
      enum: ['student', 'hod', 'super_admin'],
      required: true,
    },
    department: {
      type: String,
      required: function () {
        return this.role === 'student' || this.role === 'hod';
      },
      trim: true,
    },
    rollNumber: { type: String, sparse: true, trim: true },
    semester: {
      type: Number,
      min: 1,
      max: 8,
      required: function () {
        return this.role === 'student';
      },
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'rejected'],
      default: function () {
        return this.role === 'hod' ? 'pending' : 'approved';
      },
    },
  },
  { timestamps: true }
);

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('User', userSchema);