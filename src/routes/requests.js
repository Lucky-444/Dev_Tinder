const express = require('express');
const requestsRouter = express.Router();


const {userAuth} = require("../middlewares/auth");

requestsRouter.post("/sendConnection", userAuth, async (req, res) => {
    const user = req.user;;
    console.log("sending a connection request ");
    res.send(user.firstName + "sent  the connection request");
});






module.exports = requestsRouter;