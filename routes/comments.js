var express = require("express"),
    router = express.Router({mergeParams: true}),
    Shoe = require("../models/shoe"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");


//NEW
router.get("/new", middleware.isLoggedIn, function(req, res){
    Shoe.findById(req.params.id, function(err, foundShoe){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new", {shoe:foundShoe})
        }
    })
});
//UPDATE
router.post("/", middleware.isLoggedIn, function(req, res){
    var newComment = req.body.comment;
    Shoe.findById(req.params.id, function(err, shoe){
        if(err){
            console.log(err);
        }else{
            Comment.create(newComment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                }else{
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    shoe.comments.push(comment);
                    shoe.save();
                    console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect('/shoes/' + shoe._id);
                }
            })
        }
    })
});

//EDIT
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req,res){

    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
          res.render("comments/edit", {shoe_id: req.params.id, comment: foundComment});
        }
    });
})

//UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
       if(err){
           console.log(err);
       }else{
           res.redirect("/shoes/" + req.params.id);
       }
   })
})

//DELETE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/shoes/" + req.params.id);
        }
    })
});

module.exports = router;