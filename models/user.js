var mongoose = require("mongoose");
var passportLocalMongoose = require('passport-local-mongoose');
//Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

var UserSchema = new mongoose.Schema({
    username : String,
    password : String
});

UserSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", UserSchema);