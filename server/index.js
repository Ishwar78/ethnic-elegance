import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import heroMediaRoutes from './routes/heroMedia.js';
import productsRoutes from './routes/products.js';
import categoriesRoutes from './routes/categories.js';
import User from './models/User.js';
import Contact from './models/Contact.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://sharmaishwar970:ISHWAR123@cluster0.b73q6ph.mongodb.net/Vastra';

// Function to seed admin user if it doesn't exist
async function initializeAdminUser() {
  try {
    const existingAdmin = await User.findOne({ email: 'admin@vasstra.com' });

    if (!existingAdmin) {
      console.log('🔄 Creating admin user...');
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin@123', salt);

      const adminUser = new User({
        name: 'Vasstra Admin',
        email: 'admin@vasstra.com',
        password: hashedPassword,
        phone: '+91-9876543210',
        role: 'admin',
        isActive: true,
        address: {
          street: 'Admin Street',
          city: 'Admin City',
          state: 'Admin State',
          zipCode: '000000',
          country: 'India'
        }
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully!');
      console.log('📋 Admin Credentials: admin@vasstra.com / admin@123');
    } else {
      console.log('✅ Admin user already exists!');
    }
  } catch (error) {
    console.error('❌ Error initializing admin user:', error);
  }
}

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('✅ MongoDB connected successfully!');
    await initializeAdminUser();
  })
  .catch((err) => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/hero-media', heroMediaRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/categories', categoriesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 API routes available at http://localhost:${PORT}/api`);
});
