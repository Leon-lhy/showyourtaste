var mongoose = require("mongoose");
var user = require("./user");

var ShoeSchema = new mongoose.Schema({
    name:String,
    price:String,
    image:String,
    description:String,
    //authorization
    author :{
        id :{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    comments: [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ]
});

module.exports = mongoose.model("Shoe", ShoeSchema);
