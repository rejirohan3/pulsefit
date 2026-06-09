const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Allow ALL origins — perfect for portfolio project
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'PulseFit API is running' });
});

// Routes
app.use('/api/auth',    require('./routes/auth'));
app.use('/api/users',   require('./routes/users'));
app.use('/api/plans',   require('./routes/plans'));
app.use('/api/payment', require('./routes/payment'));
app.use('/api/gyms',    require('./routes/gyms'));
app.use('/api/blogs',   require('./routes/blogs'));

// Connect DB then start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB error:', err.message);
    process.exit(1);
  });