const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON request bodies

// Get /user ==>IT checks  all the app.xxx("matching requests") functions

app.use("/" ,(req,res,next) => {
    console.log("zero handler");
    next();
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("handle 1st route handlers");
    next();
  },
  (req, res, next) => {
    console.log("handle 2nd route handlers");
    next();
  },
  (req, res, next) => {
    console.log("3rd route handlers ");
    res.send("hello");
  }
);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
