import { uploadOnCloud, deleteOnCloud } from '../utils/cloudinary.js';

import picDb from "../models/picModel.js"


const uploadPic = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success:false,
                message:"No file uploaded."});
        }

        const filePath = req.file.path;
        const response = await uploadOnCloud(filePath);
        if(!response){
            return res.status(400).json({
                success:false,
                message: "File upload failed..."
            })
        }

        const name = req.body.name;
        const url = response.secure_url;
        const pic = new picDb({
            name,
            picUrl:url
        });
        await pic.save();

        return res.status(200).json({
            success:true,
            message: "File uploaded successfully!"
        });
    } catch (err) {
        console.error("Error during file upload:", err);
        return res.status(500).json({
            success:false,
            message:"File upload failed."
        });
    }
}

const deletePic = async(req, res)=>{
    try{
        const imgUrl = req.query.url;
        if(!imgUrl){
            return res.status(400).json({
                success:false,
                message: "Img name not catch"
            })
        }
        const imgName = imgUrl.split('/').pop().split('.')[0];

        const response = await deleteOnCloud(imgName);
        if(response.result === "ok"){
            await picDb.deleteOne({ picUrl: imgUrl });
            return res.status(200).json({
                success:true,
                message: "File delete successfully!"
            });
        }
        return res.status(400).json({
            success:false,
            message: "File delete failed..."
        })
    } catch (err) {
        console.error("Error during file delete:", err);
        return res.status(500).json({
            success:false,
            message:"File delete failed."
        });
    }
}

const getPics = async(req, res)=>{
    try{
        const pics = await picDb.find();
        const imgs = [];
        pics.forEach(element => {
            imgs.push({name:element.name,
                src: element.picUrl
            })
        });
        res.json({
            success:true,
            imgs:imgs
        });
    } catch (err){
        console.error("Error during file get:", err);
        return res.status(500).json({
            success:false,
            message:"File get failed."
        });
    }
}

export {uploadPic, deletePic, getPics};