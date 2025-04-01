const express = require("express");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName skills age gender photoUrl";

//Get ALl Pending Connections Request of logged in user
userRouter.get("/user/requests/recieved", userAuth, async (req, res) => {
  try {
    //In this Method We only get rter ConnectionRequest object_id
    //But We Need The ConnectionRequest Information
    //There is Two Way to Do that
    // 1. Fetch All ConnectionRequest and then filter them by loggedInUser
    // 2. Using DB Fetch There data

    //2method Is  DO A Built relationship Bewteen The connectionRequest DB and User DB\
    //How to DO that ===> Using Ref Method (ref : User) ==>
    // GO and read about That in MongoDb Websites

    // How To Populate ConnectionRequest Let us See

    const loggedInUser = req.user;
    const connectionRequest = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", ["firstName", "lastName"]);

    res.json({
      message: "Connection request fetched successfully",
      data: connectionRequest,
    });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

userRouter.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    //how  to Fetch Who are Connected With me
    // How To knoW That
    //we Cehck status Code Of User It Is  Accepted Or Not
    //THEN Check for
    //whther  The Logged In User is In From user id Or toUserId just Check It

    // Akhaya => Elon --> Accepted
    //Elon => Dhoni --> Accepted
    // check Where Elon Is ToUser Or FroM User Or

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [
        {
          fromUserId: loggedInUser._id,
          status: "accepted",
        },
        {
          toUserId: loggedInUser._id,
          status: "accepted",
        },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    const data = connectionRequest.map((row) => {
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.json({ message: "Connections fetched successfully", data: data });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});



module.exports = userRouter;
