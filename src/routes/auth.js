const express = require('express');
const authRouter = express.Router();


const { validateSignupData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");


authRouter.post("/signup", async (req, res) => {
    try {
      //validation is required
      validateSignupData(req);
      const {
        firstName,
        lastName,
        email,
        password,
        photoUrl,
        about,
        gender,
        age,
        skills,
      } = req.body;
      //Encrypt password
      const passwordHash = await bcrypt.hash(password, 10);
      console.log(passwordHash);
  
      const userObj = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
        photoUrl,
        about,
        gender,
        age,
        skills,
        // additional fields...
      });


      const savedUser  = await userObj.save();
      const token = await savedUser.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
        httpOnly: true,
      });
      
      res.status(201).json({ message: "User successfully added" ,data : savedUser });
    } 
    
    catch (error) {
      console.error("Signup Error:", error);
      res.status(400).send({ error: error.message || "Error saving user" });
    }
  });
 
  
authRouter.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });
      if (!user) {
        throw new Error("email id is notvalid");
      }
      const isPasswordValid = await user.validatePassword(password);
  
      if (isPasswordValid) {
        //jwt & cookies
        //Create a JWT token
        const token = await user.getJWT();
       
  
        //add the token to the cookie and send response back to the user
  
        res.cookie("token", token);
  
        res.send(user);
      } else {
        
        throw new Error("Invalid password");
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send("error" + err.message);
    }
  }); 


authRouter.post("/logout", async (req ,res) => {
  res.cookie("token",null ,{ expires : new Date(Date.now())});
  res.send("Logged Out");
  
  });







module.exports = authRouter;