import express from "express";
const app = express();

import router from "./routers/router.js";
import connectDb from "./Config/dbConfig.js";

import cors from 'cors';
app.use(cors({
    origin: '*', // Allow all domains
}));

app.use(express.json());

app.get("/", (req,res)=>{
    res.send("hi");
})

app.use("/api",router);

let port = process.env.PORT || 9090;

connectDb();

app.listen(port,()=>{
    console.log("=======================");
    console.log(`server is start at ${port}...`);
    console.log("=======================");
});