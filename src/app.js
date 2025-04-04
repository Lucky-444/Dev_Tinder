const express = require("express");
const connectDB = require("./config/database");

const port = 3000;

const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests"); 
const userRouter = require("./routes/user");
const cors = require("cors");

app.use(cors({
  origin : "http://localhost:5173", // this is damain of our frontend server 
  // they told you from Where your frontend is HOsted
  //and set cookie domain in cookie section 
  // now credentials ==> http or https are work
  //we are white lising the credentials and origin
  
  credentials : true,
  allowedHeaders : ['Content-Type', 'Authorization']
}));
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
