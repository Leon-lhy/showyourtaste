var express = require("express"),
    router = express.Router({mergeParams: true}),
    Shoe = require("../models/shoe"),
    Comment = require("../models/comment");


//NEW
router.get("/new", function(req, res){
    Shoe.findById(req.params.id, function(err, foundShoe){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {shoe:foundShoe})
        }
    })
});
//UPDATE
router.post("/", function(req, res){
    var newComment = req.body.comment;
    Shoe.findById(req.params.id, function(err, shoe){
        if(err){
            console.log(err);
        }else{
            Comment.create(newComment, function(err, comment){
                if(err){
                    console.log(err);
                }else{
                    shoe.comments.push(comment)
                    shoe.save();
                    res.redirect('/shoes/' + shoe._id);
                }
            })
        }
    })
});

//EDIT
router.get("/:comment_id/edit",function(req,res){

    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
          res.render("comments/edit", {shoe_id: req.params.id, comment: foundComment});
        }
    });
})

//UPDATE
router.put("/:comment_id", function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           console.log(err);
       }else{
           res.redirect("/shoes/" + req.params.id);
       }
   })
})

//DELETE
router.delete("/:comment_id", function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/shoes/" + req.params.id);
        }
    })
});

module.exports = router;