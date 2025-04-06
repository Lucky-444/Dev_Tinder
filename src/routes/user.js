const express = require("express");

const User = require("../models/user");

const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName skills age gender about  photoUrl"; // you can write it in array form

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
    }).populate("fromUserId", [
      "firstName",
      "lastName",
      "age",
      "gender",
      "photoUrl",
      "about",
    ]);

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

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;

    //if you send a connection request to him or reject the user then  you can not Seen  their Profile again again
    // and the logged in user will not see their Profile again and again
    // fetch all the users who are in connection with logged in user
    // and  check for the status of connection request between logged in user and these users
    // if they are not connected then fetch their profile

    // user Should see all the other users in card except these card
    //1.His own card
    //2.His connected card
    // who have ignored or already send connection request\

    // example let Rahul is a new user
    // Rahul can see only those Profile
    // Rahul = ["Akhaya", "Elon" , "Mark" , "Donald" ,"Mahndra Singh Dhoni"]

    //Rahul --> connection request to Akhaya
    // Rahul = [ "Elon" , "Mark" , "Donald" ,"Mahendra Singh"]

    // Rahul --> connection request to Elon  also
    // Rahul = [ "Mark" , "Donald" ,"Mahendra Singh"]

    // if Akhaya was Rejected the Request Then Rahul Doesn't see Akhaya's Profile again
    // Rahul = [ "Mark" , "Donald" ,"Mahendra Singh"]

    // ELon accered to connection request Then ALso Rahul doesn't see Elon's Profile again

    // now come to ELons feed
    //ELon = ["Akhaya", "Mark" , "Donald" ,"Mahendra Singh Dhoni"]
    // he Dont see his Profile(own)  and Rahuls profile because he already connected to Rahul by accepting the connection request
    // simillarly Akhyan cant see Rahuls profile because he already rejected the connection request

    const loggedInUser = req.user;

    // find out all The Connections Request that either send or receives
    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set(); //set datd structure for uniqueness not stored any duplicates

    connectionRequest.forEach((req) => {
      hideUserFromFeed.add(req.fromUserId.toString());
      hideUserFromFeed.add(req.toUserId.toString());
    });

    const user = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } }, // exclude the users whose id are in hideUserFromFeed
        { _id: { $ne: loggedInUser._id } }, // exclude the logged in user
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    /// now there is arrive another edge case
    // we didn't send at a time all user
    // let us assume there total 999 user in your db
    // now a new user signup and logged in
    // then we didn't show all 999 users to the new user at a time
    // this makes your application slow down
    // we want to show small chunk chunks part of the 999 user(like 10 divisior);
    //this is called pagination

    //jsut read about .skip() , and .limit();

    res.json({ data: user });
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
});

module.exports = userRouter;
