import { uploadOnCloud, deleteOnCloud } from '../utils/cloudinary.js';


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
        const imgName = req.query.imgName;
        if(!imgName){
            return res.status(400).json({
                success:false,
                message: "Img name not catch"
            })
        }

        const response = await deleteOnCloud(imgName);
        if(response.result === "ok"){
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

export {uploadPic, deletePic};