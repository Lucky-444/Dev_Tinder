const mongoose = require("mongoose");

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
    default :"https://www.pnrao.com/wp-content/uploads/2023/06/dummy-user-male.jpg",
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

const userModel  = mongoose.model("User", userSchema);
module.exports = userModel;
