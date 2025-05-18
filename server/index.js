import dotenv from 'dotenv'
dotenv.config();
console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');

import express from 'express';
import cors from 'cors'
import uploadRoutes from './routes/uploadRoutes.js'
import connectDB from './config/db.js';

const app = express();




app.use(cors());
app.use(express.json());

app.use('/api', uploadRoutes);

connectDB();

const PORT  = process.env.PORT || 8000;

app.listen(PORT , ()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})