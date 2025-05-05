import {connect} from "mongoose";
import { DB_NAME } from "../constants.js";


const connectDB = async function (){
  try {
    // console.log("hello from connectDB() try")
    const connectionInstance = await connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log(`/n MONGODB connected !! DB HOST : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed",error);
    process.exit(1)
  }
}
export default connectDB
