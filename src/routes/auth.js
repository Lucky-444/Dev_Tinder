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
      await userObj.save();
      console.log("User Data:", req.body);
      res.status(201).send({ message: "User successfully added" });
    } catch (error) {
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
  
        res.send("Login Successful");
      } else {
        throw new Error("Invalid password");
      }
    } catch (err) {
      res.status(500).send("error" + err.message);
    }
  }); 







module.exports = authRouter;