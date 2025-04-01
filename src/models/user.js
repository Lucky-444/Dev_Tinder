const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength:50,
    minLength:1,

  },
  lastName: {
    type: String,
    required: true,
  }, 
  email: {

    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid email");
      }
    }
    
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    min: 1,
    max: 100,
  },
  gender: {
    type: String,
    //by default this validation is called when a new document is created a new object if You try to update then it should be not   work 
    validate(value){
      if(!["male", "female" ,"others"].includes(value)){
        throw new Error("IT is not a valid");
      }
    }
  },
  photoUrl: {
    type: String,
    validate(value){
      if(!validator.isURL(value)){
        throw new Error("Invalid Phot Url");
      }
    }
  },

  about: {
    type: String,
  },
  skills: {
    // array of skills 
    type: [String],
    default:"this is deafult skills",
  },

},
{
  timestamps: true, //add createdAt and updatedAt fields automatically by mongoDB 
});

userSchema.methods.getJWT = async function (){
  const user = this;

  const token = jwt.sign({ _id: user._id }, "DEV@tinder790",{expiresIn:"1d"});
  return token;
}

userSchema.methods.validatePassword = async function(passwordInput){
  const user = this;

  const passwordHash = user.password;
  const isvalid = await bcrypt.compare(passwordInput, passwordHash);
  return isvalid;
}

const userModel  = mongoose.model("User", userSchema);
module.exports = userModel;

