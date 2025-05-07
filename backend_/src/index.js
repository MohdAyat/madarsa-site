import cors  from 'cors';
import express from 'express';
import userRouter from './routes/userRoute.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

dotenv.config({
  path: "./.env"
});

// Initialize the app
const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'https://madarsa-site.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


app.use(express.static("public"))

// Routes
app.use('/api/v1/user', userRouter);


// Default Route
app.get('/', (req,res) => { // http://localhost:8787
  return res.json({msg: 'Welcome to the Backend!'});
});



// Connect to the database
connectDB()
.then(()=>{
  app.listen(process.env.PORT || 8000,()=>{
    console.log(`app is listening at PORT : ${process.env.PORT}`);
  })
  app.on('error',(err)=>{
    console.log('Error while listening ',err)
    throw err
  })
})
.catch((err)=>{
  console.log('MONGODB connection failed: ',err);
})





export default app;