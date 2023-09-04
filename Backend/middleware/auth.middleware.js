const jwt=require("jsonwebtoken");
require("dotenv").config();
const { logOutAdminModel } = require("../model/admin.model");

let LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

require("dotenv").config();

//Authentication middleware
const auth=async(req,res,next)=>{

    const token=localStorage.getItem("token");
   // console.log(token)

    try {
       
        if(token){
            const blTokenAvailable=await logOutAdminModel.findOne({blToken:token});
            // console.log(blTokenAvailable)
        
            if(blTokenAvailable){
                res.status(201).json({msg:"User logged out, Please Login"})
            }else{

               const decodeToken=jwt.verify(token,process.env.secretKey);
               if(decodeToken){
                // console.log(decodeToken)
                  req.body.userId=decodeToken.userId;
                  next();
        
               }else{
                res.status(201).json({msg:"User is not authorized"})
               }
        
            }
        
            }

    } catch (error) {
        res.status(400).json({error:error})
    }
}

//Export Module
module.exports=auth;