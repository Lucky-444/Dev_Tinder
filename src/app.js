const express = require("express");
const connectDB = require("./config/database");
const port = 3000;
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {userAuth} = require("./middlewares/auth");


 
app.use(cookieParser());
app.use(express.json()); // This enables JSON parsing for incoming requests



app.post("/signup", async (req, res) => {
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
    res.status(201).json({ message: "User successfully added" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(400).json({ error: error.message || "Error saving user" });
  }
});

///authentication method
app.post("/login", async (req, res) => {
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

app.get("/profile", userAuth, async (req, res) => {
  try {  
    const user = req.user;
    res.send(user);
  } catch (error) {
    res.status(401).send("You are not authorized to view this profile" + error.message);
  }
});


connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err.message);
    console.log("databse connected error: " + err.message);
    process.exit(1);
  });
