//dependecies
const bcrypt=require("bcrypt");
require("dotenv").config();
const jwt=require("jsonwebtoken");
const { userModel, logOutAdminModel } = require("../model/admin.model");





//Register User
const registerUser=async(req,res)=>{
    const {firstName,lastName,mobile,email,password}=req.body;
    try {
        const userAvailable=await userModel.findOne({email});
        if(userAvailable){
            //user is already registered
            res.status(202).json({msg:"User already exist"})
        }else{
           //creating new user 
           bcrypt.hash(password,4,async(error,hash)=>{
            if(hash){
                const newUser=await new userModel({firstName,lastName,mobile,email,password:hash});
                await newUser.save();
                res.status(201).json({msg:"User Registered Successfully"})
            }else{                
                console.log(error)
            }
           })           
        }        
    } catch (error) {
        console.log(error)
    }
}


//get all user
const getAllUser=async(req,res)=>{

    const {userId}=req.body;
    try {
        const admin=await userModel.findOne({_id:userId});
        const isAdmin=admin.role;
        if(isAdmin=="admin"){
            const allUser=await userModel.find({role:"user"});
            res.status(200).json({users:allUser});   
        }else{
            res.status(400).json({msg:"user is not an admin"})
        }    
    } catch (error) {
        console.log(error)
    }
}

//delete user
const deleteUser=async(req,res)=>{
    const {myId}=req.params;
    const {userId}=req.body;
    try {
        const admin=await userModel.findOne({_id:userId});
        const isAdmin=admin.role;
        if(isAdmin=="admin"){
            const user=await userModel.findByIdAndDelete({_id:myId});
            res.status(200).json({msg:"User Deleted Successfully",deletedUser:user})  
        }else{
            res.status(400).json({msg:"user is not an admin"})
        }  
        
    } catch (error) {
        console.log(error)
    }
}

//update user

const updateUser=async(req,res)=>{
    const {myId}=req.params;
    const {userId}=req.body;
    try {
        const admin=await userModel.findOne({_id:userId});
        const isAdmin=admin.role;
        if(isAdmin=="admin"){
            const user= await userModel.findByIdAndUpdate({_id:myId},req.body,{new:true});
            res.status(200).json({msg:"User Updated Successfully", updatedUser:user}) 
        }else{
            res.status(400).json({msg:"user is not an admin"})
        }  
        
    } catch (error) {
        console.log(error)
    }
}

//blockUser
const blockUser=async(req,res)=>{
    const {myId}=req.params;
    try {
       const user= await userModel.findByIdAndUpdate({_id:myId},{isBlocked:true},{new:true});
        res.status(200).json({msg:"User Blocked Successfully", updatedUser:user})
        
    } catch (error) {
        console.log(error)
    }
}

//unBlock the user
const unBlockUser=async(req,res)=>{
    const {myId}=req.params;
    try {
       const user= await userModel.findByIdAndUpdate({_id:myId},{isBlocked:false},{new:true});
        res.status(200).json({msg:"User Unblocked Successfully", updatedUser:user})
        
    } catch (error) {
        console.log(error)
    }
}


//admin Login

let LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');


const adminLogin=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const userAvailable=await userModel.findOne({email});
        if(userAvailable){
            bcrypt.compare(password,userAvailable.password,async(error,result)=>{
                if(result){
                  const accessToken=jwt.sign({userId:userAvailable._id,email:userAvailable.email},process.env.secretKey,{expiresIn:"21days"});

                //storing the token inside local storage
                 localStorage.setItem("token",accessToken);

                //  console.log(localStorage.getItem("token"))
                  
                  res.status(200).json({msg:"Login Successfull!",accessToken})
                }else if(!result){
                  res.status(202).json({msg:"Invalid Credentials!"})
                }else{
                  console.log(error)
                }
            })
        
        }else{
            res.status(202).json({msg:"Invalid Credentials"})
        }
        
    } catch (error) {
        console.log(error)
    }
}


//logOut User


const logOutAdmin=async(req,res)=>{

    const token=localStorage.getItem("token");

    try {
        if(token){

            const newblT=await new logOutAdminModel({
                blToken:token
            });
            await newblT.save();
            res.status(200).json({msg:"User has been logged out"});
        }else{
            res.status(201).json({msg:"Token not recieved"})
        }
    } catch (error) {
        
        res.status(400).json({error})
    }

    
}



//exportin module

module.exports={
    registerUser,
    getAllUser,
    deleteUser,
    updateUser,
    adminLogin,
    blockUser,
    unBlockUser,
    logOutAdmin,
}