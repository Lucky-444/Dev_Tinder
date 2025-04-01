const express = require("express");
const connectDB = require("./config/database");

const port = 3000;

const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests"); 
const userRouter = require("./routes/user");


app.use(cookieParser());
app.use(express.json()); // This enables JSON parsing for incoming requests


app.use("/" ,authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);
app.use("/" ,userRouter);



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
