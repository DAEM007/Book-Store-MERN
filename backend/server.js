import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/booksRoute.js';
import cors from 'cors';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongodb_url = process.env.mongoDBURL;

// middleware to parse request body
app.use(express.json());

// middleware to handle custom-CORS policy
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET','POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Mern bookstore!');
});

// middleware for routes
app.use('/books', router);

mongoose
    .connect(mongodb_url)
    .then(() => {
        console.log('connected to database sucessfully!');
        // only when connected to database...listen at port
        app.listen(PORT, () => {
            console.log(`listening on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err.message);
    })