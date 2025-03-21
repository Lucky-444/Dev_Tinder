const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies

app.get("/user", (req, res, next) => {
  console.log("handle route handlers");
  next();
});
app.get("/user" , (req, res, next) => {
    console.log("Handle additional route handlers");
    res.send("User information");
  });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
