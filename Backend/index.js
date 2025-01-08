import express from "express";
const app = express();
import cors from "cors";
import router from "./routers/router.js";


app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>{
    res.send("hi");
})

app.use("/api",router);


let port = process.env.PORT || 9090;

app.listen(port,()=>{
    console.log("=======================");
    console.log(`server is start at ${port}...`);
    console.log("=======================");
});