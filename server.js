const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/products', require('./src/routes/productRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/productCategory', require('./src/routes/productCategoryRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
