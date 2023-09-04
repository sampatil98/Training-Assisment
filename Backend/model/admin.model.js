
const mongoose=require("mongoose");

//userSchema
const userSchema=mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    mobile:{type:Number,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String,default:"user"},
    isBlocked:{type:Boolean,default:false}
},{timeStamp:true})

//userModel
const userModel=mongoose.model("user",userSchema);

//Logout User

const logoutSchema=mongoose.Schema({
    blToken:String
});

const logOutAdminModel=mongoose.model("blToken",logoutSchema);

//exporting model
module.exports={
    userModel,
    logOutAdminModel
}
