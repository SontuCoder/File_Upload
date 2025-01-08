import multer from "multer";

const storage = multer.diskStorage({
    destination: (req,file, cb)=>{
        cb(null,"public");
    },
    filename: (req, file, cb)=>{
        const uniqName = `sontu-${Date.now()}-${file.originalname}`; // change file name
        cb(null, uniqName);
    }
});


const fiefilter = (req, file, cb)=>{
    if(file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/pdf"){
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error("Only jpge, png, pdf, jpg  support"));
    }
}

const upload = multer({
    storage:storage,
    fiefilter:fiefilter
})

export default upload;
