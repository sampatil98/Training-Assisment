const express=require("express");
const { registerUser, adminLogin, getAllUser, deleteUser, updateUser } = require("../controller/admin.controller");
const auth = require("../middleware/auth.middleware");

const adminRoutes=express.Router();

adminRoutes.post("/login",adminLogin);

adminRoutes.use(auth);
adminRoutes.post("/createUser",registerUser);
adminRoutes.get("/users",getAllUser);
adminRoutes.delete("/deleteUser/:myId",deleteUser);
adminRoutes.put("/updateUser/:myId",updateUser);




module.exports={
    adminRoutes
}
