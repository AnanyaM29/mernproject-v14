
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';

// Configure dotenv
dotenv.config();

// Create an Express app
const app = express();

// Database connection/configuration
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Define your API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

// Serve static files (your front-end) - this should be after defining API routes
app.use(express.static(path.join(__dirname, './client/build')));

// Define a catch-all route for serving your front-end's index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
});


//const PORT = process.env.PORT ||1234;

app.listen(1234,(req,res)=>{
    console.log("Server is running");
});

app.get('/',(req,res)=>{
    res.send("<h1>Welcome!</h1>")
});