const {Router}=require("express");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const {UserModel}=require("../model/user.model");

const UserRouter=Router();

UserRouter.post("/register",async (req,res)=>{
    try {

        const user= new UserModel(req.body);
        await user.save();

        res.status(200).send({
            isError:false,
            message:"User Registered successfully"
        })
    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
});

UserRouter.post("/login",async (req,res)=>{
    try {
        const {email,password}=req.body;

        const user= await UserModel.findOne({email});

        if(!user){
            return res.status(400).send({
                isError:true,
                message:"wrong Email"
            })
        }
        
        if(user.password==password){
            const token=jwt.sign({username:user.firstname,userid:user._id,userdepartment:user.department},process.env.secretkey)
           return res.status(200).send({
                isError:false,
                token:token,
                message:"User login successful"
            })
        }else{
            return res.status(400).send({
                isError:true,
                message:"Wrong Password"
            })
        }

    } catch (error) {
        res.status(400).send({
            isError:true,
            message:error.message
        })
    }
});


module.exports={UserRouter}