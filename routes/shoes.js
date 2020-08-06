var express = require("express");
var router = express.Router();
var Shoe = require("../models/shoe");
var middleware = require("../middleware");


//INDEX - show all sneakers
router.get("/", function(req, res){
    if(req.query.search){
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Shoe.find({name:regex}, function(err, allshoes){
            if(err || !allshoes.length){
                req.flash('error', 'No sneakers matched your search. Please try again.');
                res.redirect("back");
            }else{
                res.render("shoes/index", {shoes:allshoes});
            }
            
        });
    }else{
        //Get all sneakers from db
        Shoe.find({}, function(err, allshoes){
            if(err){
                console.log(err);
            }else{
                res.render("shoes/index", {shoes:allshoes});
            }
            
        });
    }
    
});

//CREATE - add new sneaker to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add
    console.log("name :" + req.body.name);
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newShoe = {name: name, price:price, image: image, description: desc, author:author}
    Shoe.create(newShoe, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/shoes");
        }
    });
    
})

//NEW - show form to create a new
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("shoes/new");
})

//show
router.get("/:id", function(req, res){
    Shoe.findById(req.params.id).populate("comments").exec(function(err, foundShoe){
        if(err){
            console.log(err);
        }else{
            res.render("shoes/show", {shoe:foundShoe})
        }
    })
});

//edit
router.get("/:id/edit", middleware.checkShoeOwnership, function(req, res){
    Shoe.findById(req.params.id, function(err, foundShoe){
        
        res.render("shoes/edit", {shoe:foundShoe});
        
    })
    
});

//update
router.put("/:id", middleware.checkShoeOwnership, function(req,res){
    Shoe.findByIdAndUpdate(req.params.id, req.body.shoe, function(err, updatedShoe){
        if(err){
            console.log(err);
        }else{
            res.redirect("/shoes/" + req.params.id)
        }
    });
});


router.delete("/:id", middleware.checkShoeOwnership, function(req, res){
    Shoe.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/shoes");
        }
    })
})

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;