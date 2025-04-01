const mongoose = require("mongoose");
///why indexing is required 
// it fast My DB 
//it is do in case where your DB has  million and billion of records and fetching data may take a long time
//
const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
     
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{ VALUE } is incorrect`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound Indexes

connectionRequestSchema.index({fromUserId : 1 ,toUserId : 1});//this  will index in Asecnding Order
// -1 means In descending aorder






// it a  MIDDLEWARE AND callerd every time WHen connecti0on request is saved
connectionRequestSchema.pre('save', function(next) {
    //Always Try To Writ FUNCTION(Normal Function) otherwis it WIll Not WOrk
    const connectionRequest = this;

    //check The fromUserId id same as toUserId
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error(" You can not send a connection request to yourself");

    }
    next();// never forget to Called the next() function Beacause it is Middleware
})

const ConnectionRequestModel = mongoose.model(
  "ConnectionRequestModel",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
