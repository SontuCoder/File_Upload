import mongoose from "mongoose";

const URL = process.env.DB_URL;
const connectDb = async()=>{
    try{
        await mongoose.connect(URL);
        console.log("Db connected.");
    } catch (err) {
        console.log("Db connection failed", err);
        process.exit(0);
    }
};

export default connectDb;