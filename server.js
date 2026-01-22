import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

// test root
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

// routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect('mongodb://127.0.0.1:27017/online-shop')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// PUT
app.put('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, price } = req.body;

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products[index] = {
    ...products[index],
    name,
    price
  };

  res.json(products[index]);
});

// DELETE
app.delete('/api/products/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const index = products.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products.splice(index, 1);
  res.json({ message: 'Product deleted' });
});
