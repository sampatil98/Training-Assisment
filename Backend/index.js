const express=require("express");
const cors=require("cors");
require("dotenv").config();

const {connection}=require("./config/db");
const {UserRouter}=require("./routes/user.routes");

const app=express();

app.use(express.json());
app.use(cors());

app.use("/user",UserRouter);

app.listen(process.env.port,async()=>{
    try {
        await connection;
        console.log("connected to DB");
        console.log(`server is running at port ${process.env.port}`);
    } catch (error) {
        console.log(error);
    }
})
