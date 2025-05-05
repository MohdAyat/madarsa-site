import cors  from 'cors';
import express from 'express';
import userRouter from './routes/userRoute.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

// Initialize the app
const app = express();

app.use(cors({
  credentials: true,
  origin: `http://localhost:5173`,
}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static("public"))
app.use(cookieParser());

dotenv.config({
  path: "./.env"
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


// Middleware


// Routes
app.use('/api/v1/user', userRouter);


// Default Route
app.get('/', (req,res) => { // http://localhost:8787
  return res.json({msg: 'Welcome to the Backend!'});
});

export default app;