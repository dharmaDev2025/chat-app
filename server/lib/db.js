import mongoose from "mongoose";
//connection
export const connectDB=async()=>{
    try {
        mongoose.connection.on("connected",()=>console.log("data base connected"))
        await mongoose.connect(`${process.env.MONGODB_URI}/chatapp`);

    } catch (error) {
        console.log(error);

        
    }
}