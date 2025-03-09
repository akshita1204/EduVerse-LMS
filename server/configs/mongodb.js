//function to connect with mongo
import mongoose from "mongoose";
const connectdb=async()=>
{
    mongoose.connection.on('connected',()=>console.log("database connected"))
    await mongoose.connect(`${process.env.MONGODB_URI}/lms`)
}
export default connectdb;