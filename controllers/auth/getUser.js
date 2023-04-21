const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res)=>{
    try{
        
    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = postLogin;