import cors  from 'cors';
import express from 'express';
import userRouter from './routes/userRoute.js';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

// Initialize the app
const app = express();

const corsOptions = {
  origin: (origin, callback) => {
      const allowedOrigins = [
          'http://localhost:5173',
          'https://madarsa-site.vercel.app'
      ];

      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

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