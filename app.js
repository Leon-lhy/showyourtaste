var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    Shoe = require("./models/shoe");
    Comment = require("./models/comment")
    app = express();

var showRoutes = require("./routes/shoes");
var commentRoutes = require("./routes/comments");

mongoose.connect("mongodb://localhost/shoe_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));

app.use("/shoes", showRoutes);
app.use("/shoes/:id/comments", commentRoutes);

app.get("/", function(req, res){
    res.render("landing");
})




app.listen(3000, function(){
    console.log("ShowTaste has been started.....")
})