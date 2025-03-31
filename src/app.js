const express = require("express");
const connectDB = require("./config/database");
const port = 3000;
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

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
    const passwordHash = user.password; 
    const isPasswordValid = await bcrypt.compare(password, passwordHash);

    if (isPasswordValid) {
      // console.log(email);
      // console.log(passwordHash);
      res.send("Login Successful");
    }else{
      throw new Error("Invalid password"); 
    }
  } catch (err) {
    res.status(500).send("error" + err.message);
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

app.delete("/delete", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send("users deleted successfully");
    console.log(req.body);
  } catch (err) {
    console.log("somethig went wrong");
    res.status(500).send({ error: error.message || "Error deleting user" });
  }
});

//update data of  a user

app.patch("/update/:userID", async (req, res) => {
  const userId = req.params?.userID;
  const updatedData = req.body;

  try {
    // Check if user exists
    const ALLOWED_UPADATES = ["photoUrl", "about", "gender", "age", "skills"];
    //api level  checking
    const isValidUpdate = Object.keys(updatedData).every((key) =>
      ALLOWED_UPADATES.includes(key)
    );

    if (!isValidUpdate) {
      res.status(400).send({
        error:
          "Invalid update. Only allowed updates are photoUrl, about, gender, age, skills",
      });
      return; // return to avoid further processing
    }

    if (updatedData.skills.length > 10) {
      throw new Error("skills can not be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, updatedData, {
      new: true,
    });
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
app.put("/updated", async (req, res) => {
  const email = req.body.email;
  const updatedData = req.body;
  try {
    const user = await User.findOneAndUpdate({ email: email }, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
    console.log(req.body);
  } catch (err) {
    console.error(err.message);
    console.log("something is worng");
    res.status(500).send({ error: error.message || "Error updating user" });
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
