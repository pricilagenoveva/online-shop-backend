import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Product from './models/Product.js';
// import authRoutes from './routes/authRoutes.js'; // route untuk register/login

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: '*', credentials: true }));

// Test root
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

import authRoutes from './routes/authRoutes.js';
app.use('/api/auth', authRoutes);


// Product routes
app.get('/api/products', async (req, res) => {
  try {
    console.log("Request ke /api/products diterima");
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error("Error di /api/products:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description } = req.body;

    const product = await Product.findByIdAndUpdate(
      id,
      { name, price, description },
      { new: true }
    );

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json(product);
  } catch (err) {
    console.error("Error di PUT /api/products/:id:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.json({ message: 'Product deleted' });
  } catch (err) {
    console.error("Error di DELETE /api/products/:id:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
});

// MongoDB connection
console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
