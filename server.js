const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/config/db');
const path = require('path');
const categoryRoute = require("./src/routes/productCategoryRoutes");
const productRoute=require("./src/routes/productRoutes");
const cors = require('cors');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors({origin :'*'}))

app.use('/api/products-category', categoryRoute);

app.use('/api/products', productRoute);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000;

app.get("/",(req, res) => {return res.json({message : "Hello"})})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// will resume code by fixing product category
