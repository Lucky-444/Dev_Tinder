const express = require("express");
const app = express();
const port = 3000;

app.get("/getUserData", (req, res) => {
  try{
    throw new Error("New error occurred");
    res.send("user data is not available");
  }
  catch(err){
    res.status(500).send("something went wrong");
  }
});


// app.use("/", (err, req, res, next) => {
//   if (err) {
//     res.status(500).send("Something went wrong");
//   }
// });

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
