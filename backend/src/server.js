import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './config/db.js';
import { seedPrincipal } from './config/seedPrincipal.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();
  await seedPrincipal();

  app.listen(PORT, () => {
    console.log(`LUOT Server running on http://localhost:${PORT}`);
  });
};

startServer();