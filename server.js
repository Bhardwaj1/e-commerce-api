const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const Product=require('./src/models/Product');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Routes
// app.use('/api/auth', require('./src/routes/authRoutes'));
// app.use('/api/products', require('./src/routes/productRoutes'));

app.use('/api/products', require('./src/routes/productRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
