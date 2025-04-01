const express = require("express");
const requestsRouter = express.Router();

const { userAuth } = require("../middlewares/auth");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user");

requestsRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      //can we make this API DYnamic
      //this API should be called when a user clicks on "Send a connection request"
      // request/send/:status/:toUserId
      // why not USE The Same Api

      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ["ignored", "interested"];

      if (!allowedStatus.includes(status)) {
        return res
          .status(400)
          .json({ message: "Invalid status Type: " + status });
      }

      //there is arrive a new condition IS The Same User Send a new request to HimSelf Again
      //you Can Also do A schema validation or write a logic for that condition 
      // There  is a schema validation : schema Pre method just GOOGLE it and Read it Thoroughly 
      // and also you can write a logic for this condition in your schema validation or middleware
      //this Schema Pre is called as a middleware (work as like a Middleware)

      //check if the user is already send a connection request to anther then
      // the other person can not send a same connection request to thr user
      //and a user send only one send request to particular user  multiple send requests
      //are not allowed to the same user

      //so that we can check if the user is already send a connection request or not

      const existingConnectionRequest = await ConnectionRequestModel.findOne({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });

      //now there is condiotn where i can send a connection request to the user tha may not be present
      //  in my DB then also my connection request will be go to  the user
      ///how to avoid it
      const toUser = await User.findById(toUserId);

      if (!toUser) {
        return res
          .status(400)
          .json({ message: "User is not registered with the system" });
      }

      //or condition in mongoose read it from mongoose libary

      if (existingConnectionRequest) {
        return res
          .status(400)
          .json({ message: "Connection request is already exists" });
      }

      const connectionRequest = new ConnectionRequestModel({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      res.json({
        message: req.user.firstName + " is " +status+ " in " +toUser.firstName,
        data: data,
      });
    } catch (err) {
      res.status(400).send("Invalid" + err.message);
    }
  }
);

module.exports = requestsRouter;
