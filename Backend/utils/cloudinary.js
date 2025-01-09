import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { config } from 'dotenv';
config();
import sharp from "sharp";

cloudinary.config({
        cloud_name:  process.env.CLOUD_NAME,
        api_key:  process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    });


const compressImage = async (filePath) => {
    const path = `public/${Date.now()}.${filePath.split(".").pop()}`
        await sharp(filePath)
            .resize(800) 
            .jpeg({ quality: 80 }) 
            .toFile(path);
        return path;
    };

const uploadOnCloud = async(filePath)=>{
    try{
        if(!filePath)return null;
        
        const file = await compressImage(filePath);
        const response = await cloudinary.uploader.upload(file,{
            resource_type: 'auto',
        });
        fs.unlink(file, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted:", file);
            }
        });
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error("Error deleting file:", err);
            } else {
                console.log("File deleted:", file);
            }
        });
        return response;
    } catch (err) {
        console.log(err);
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