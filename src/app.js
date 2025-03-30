const express = require("express");
const connectDB = require("./config/database");
const port = 3000;
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const userObj = new User({
    firstName: "lucky123",
    lastName: "swain",
    email: "swainsashank@example.com",
    password: "lucky678",
    age: "23",
    gender: "male",
  });

  try {
    await userObj.save();
    console.log(userObj);
    res.status(200).send("user successfully added");
  } catch (error) {
    res.status(500).json({ error: "Error saving user" });
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
