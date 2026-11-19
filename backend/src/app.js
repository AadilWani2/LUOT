import express from 'express';
import cors from 'cors';
import path from 'path';

import authRoutes from './routes/authRoutes.js';
import principalRoutes from './routes/principalRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import complaintRoutes from './routes/complaintRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded PDF circulars
app.use('/uploads', express.static(path.resolve('uploads')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/principal', principalRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/complaints', complaintRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'LUOT Backend API is running' });
});

export default app;