const express = require("express");
const app = express();
const port = 3000;

const { adminAuth , userAuth } = require("./middlewares/auth");

//handle auth middleware for all auth request

app.use("/admin", adminAuth);

app.get("/admin/getAllData", userAuth ,(req, res) => {
    res.send("user get all data"); 
});


app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted user");
});

app.get("/", (req, res) => {
  res.send("Deleted a user");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
