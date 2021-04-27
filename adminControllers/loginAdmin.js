const jwt = require("jsonwebtoken");
const User = require("../models/user");
require('dotenv').config();

/************************  token  ************************/
const generateAccessToken = (id) => {
    return jwt.sign({ id }, `${process.env.JWT_SECRET_KEY}`);
  };

/************************  login User ************************/
const loginAdmin=(async(req,res)=>{
    const {email , pass} = req.body;
     const data = await User.findOne({email});
     if(data)
     {
         const token = await generateAccessToken(data._id);
         res.send(token);
     }else{
         res.send("Un authenticated User");
     }
})

module.exports = loginAdmin;