import mongoose from "mongoose";

const picModel = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    picUrl:{
        type: String,
        required : true
    }
},{timestamps: true});

const picDb = new mongoose.model("file", picModel);

export default picDb;