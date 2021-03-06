var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/user");


router.get("/", function(req, res){
    res.render("landing");
});


router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    var newUser = new User({username:req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        //passport-local
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to ShowTaste " + user.username);
            res.redirect("/shoes"); 
        });
    })
});

//show login form
router.get("/login", function(req, res){
    res.render("login"); 
 });
 
 //handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/shoes",
        failureRedirect: "/login"
    }), function(req, res){
});

// logout route
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/shoes");
});



module.exports = router;

