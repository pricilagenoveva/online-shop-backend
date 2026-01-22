import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import bcrypt from 'bcryptjs';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const adminExists = await User.findOne({ email: 'admin@pricila.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin Pricila',
        email: 'admin@pricila.com',
        password: hashedPassword
      });
      console.log('Admin user created');
    } else {
      console.log('Admin already exists');
    }

    process.exit();
  })
  .catch(err => console.error(err));
