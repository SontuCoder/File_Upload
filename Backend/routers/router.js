
import express from "express";
const router = new express.Router();
import  {uploadPic, deletePic, getPics} from "../controllers/picController.js";
import  upload from "../middleware/multer.middleware.js";

router.post("/picupload",upload.single("pic"),uploadPic);

router.delete('/picdelete', deletePic);

router.get('/getimg', getPics);

export default router;
