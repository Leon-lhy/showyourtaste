var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require('body-parser'),
    methodOverride = require("method-override"),
    passport = require('passport')
    LocalStrategy = require('passport-local'),
    flash = require('connect-flash'),
    Shoe = require("./models/shoe"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    app = express();

var showRoutes = require("./routes/shoes");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/shoe_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(__dirname + "/public"));
app.use(flash());

app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    //req.user is a convenience property that is an alias for req.session.user
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/shoes", showRoutes);
app.use("/shoes/:id/comments", commentRoutes);

app.listen(3000, function(){
    console.log("ShowTaste has been started.....")
})