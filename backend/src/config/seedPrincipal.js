import User from '../models/User.js';

export const seedPrincipal = async () => {
  try {
    const existingPrincipal = await User.findOne({ role: 'super_admin' });
    if (existingPrincipal) return;

    await User.create({
      name: process.env.PRINCIPAL_NAME || 'Principal LUOT',
      email: process.env.PRINCIPAL_EMAIL || 'principal@luot.edu.in',
      password: process.env.PRINCIPAL_PASSWORD || 'Principal@123',
      role: 'super_admin',
      department: 'Administration',
      status: 'approved',
    });

    console.log('Principal (Super Admin) account seeded successfully.');
  } catch (error) {
    console.error(`Error seeding Principal: ${error.message}`);
  }
};