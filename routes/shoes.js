var express = require("express");
var router = express.Router();
var Shoe = require("../models/shoe");



router.get("/", function(req, res){
    
    Shoe.find({}, function(err, allshoes){
        if(err){
            console.log(err);
        }else{
            res.render("shoes/index", {shoes:allshoes});
        }
        
    });
});

router.post("/", function(req, res){
    var newShoe = req.body.shoe
    Shoe.create(newShoe, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/shoes");
        }
    });
    
})

//create a new pair of shoe
router.get("/new", function(req, res){
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
router.get("/:id/edit", function(req, res){
    Shoe.findById(req.params.id, function(err, foundShoe){
        if(err){
            console.log(err);
        }else{
            res.render("shoes/edit", {shoe:foundShoe});
        }
    })
    
});

//update
router.put("/:id", function(req,res){
    Shoe.findByIdAndUpdate(req.params.id, req.body.shoe, function(err, updatedShoe){
        if(err){
            console.log(err);
        }else{
            res.redirect("/shoes/" + req.params.id)
        }
    });
});


router.delete("/:id", function(req, res){
    Shoe.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/shoes");
        }
    })
})

module.exports = router;