import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { config } from 'dotenv';
config();

cloudinary.config({
        cloud_name:  process.env.CLOUD_NAME,
        api_key:  process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });

const uploadOnCloud = async(filePath)=>{
    try{
        if(!filePath)return null;

        const response = await cloudinary.uploader.upload(filePath,{
            resource_type: 'auto',
        });
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted:", filePath);
            }
        });
        return response;
    } catch (err) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted:", filePath);
            }
        });
        return null;
    }
}

const deleteOnCloud = async(fileName)=>{
    try{
        if(!fileName) return null;

        const response = await cloudinary.uploader.destroy(fileName,(error, result)=>{return{
            error, result}});
        return response;
    }catch (err) {
        return null;
    }
}

export {uploadOnCloud, deleteOnCloud};