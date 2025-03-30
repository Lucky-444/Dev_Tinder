const express = require("express");
const connectDB = require("./config/database");
const port = 3000;
const app = express();
const User = require("./models/user");

app.use(express.json()); // This enables JSON parsing for incoming requests

app.post("/signup", async (req, res) => {
  try {
    const userObj = new User(req.body);
    await userObj.save();
    console.log("User Data:", req.body);
    res.status(201).json({ message: "User successfully added" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: error.message || "Error saving user" });
  }
});

//get the single user by find email
app.get("/user", async (req, res) => {
  const email = req.body.email;
  try {
    const user = await User.findOne({ email: email });
    // if (user.length === 0) {
    //   res.status(404).send("user not found");
    //   return;
    // } else {
    //   console.log("User Data:", req.body);
    //   res.send(user);
    // }
    res.send(user);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});






















//get all users 
app.get("/feed", async (req, res) => {
  // TODO: Implement logic to fetch all users
  try {
    const users = await User.find({});
    console.log(req.body);
    res.send(users);
  } catch (error) {
    console.error("Feed Error:", error);
    res.status(500).send({ error: error.message || "Error fetching users" });
  }
});



app.delete("/delete" ,async(req,res) => {
  const userId = req.body._id;
  try{
    const user = await User.findByIdAndDelete(userId);
    if(!user){
      res.status(404).send("User not found");
      return;
    }
    res.send('users deleted successfully');
    console.log(req.body);
  }
  catch(err){
    console.log("somethig went wrong");
    res.status(500).send({error: error.message || "Error deleting user"});
  }
})




//update data of  a user 

app.put("/update", async (req, res) => {
  const userId = req.body._id;
  const updatedData = req.body;
  try {
    const user = await User.findByIdAndUpdate(userId, updatedData, { new: true });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
    console.log(req.body);
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).send({ error: error.message || "Error updating user" });
  }
});


//update by email id
app.put("/updated" ,async(req, res) =>{
  const email = req.body.email;
  const updatedData = req.body;
  try{
    const user = await User.findOneAndUpdate({ email: email }, updatedData, { new: true });
    if(!user){
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
    console.log(req.body);
  }
  catch(err){
    console.error(err.message);
    console.log("something is worng");
    res.status(500).send({ error: error.message || "Error updating user" });
  }

})































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
