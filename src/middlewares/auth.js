const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  //read the token from the the request body and find the user and  validate it
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    if (!token) {
    return  res.status(401).send({ message: "please Login" });
    }


    const decodedObj =   jwt.verify(token, "DEV@tinder790");

    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found");
    }
    console.log("User Authenticated");
    
    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).send("You are not authorized");
  }

  //vaidate the token

  //find the user and validate
};

module.exports = { userAuth };
