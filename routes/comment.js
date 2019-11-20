const express = require("express");
const router = express.Router();

const Comment = require ("../models/comment");
const Socio = require ("../models/socio");
const middleware = require ("../middleware/index");

//new form
router.get("/socio/:id_post/comment/new",middleware.isLoggedIn,(req,res)=>{
    let idPost = req.params.id_post;
    res.render("comment/new", {idPost: idPost})
});

//create
router.post("/socio/:id_post/comment",middleware.isLoggedIn, (req,res)=>{
    let idPost = req.params.id_post;
    let comment = req.body.comment;
    
    Socio.findById(idPost,(err,socioFound)=>{
        if(err || !socioFound){
            console.log(err.message);
        }else{
            Comment.create(comment,(err,commentCreated)=>{
                if(err){
                    console.log(err)
                }else{
                    socioFound.comment.push(commentCreated);
                    socioFound.save((err,result)=>{
                        if(err){
                            console.log(err)
                        }else{
                            req.flash("success", "You successfully created a new post")
                            res.redirect("/socio/" + idPost);
                        }
                    })
                }
            })
        }
    })
})

//edit form
router.get("/socio/:id_post/comment/:id_comment/edit",middleware.checkCommentOwnership, (req,res)=>{
    let idPost = req.params.id_post;
    let idComment = req.params.id_comment;
    Comment.findById(idComment,(err,foundComment)=>{
        if(err){
            req.flash("warning","Comment is not found");
        } else{
            console.log(foundComment);
            res.render("comment/edit", {commentValue:foundComment, idPost:idPost});
        }
    })
});

//update
router.put("/socio/:id_post/comment/:id_comment",middleware.checkCommentOwnership, (req,res)=>{
    let idPost = req.params.id_post;
    let idComment = req.params.id_comment;
    let comment = req.body.comment;
    Comment.findByIdAndUpdate(idComment,comment,(err,commentUpdate)=>{
        if(err || !commentUpdate){
            req.flash("warning","Something error. Please try again")
        }else{
            req.flash("success", "You successfully updated your comment")
            res.redirect("/socio/" + idPost);
        }
    })
})

//delete
router.delete("/socio/:id_post/comment/:id_comment",middleware.checkCommentOwnership,(req,res)=>{
    let idPost = req.params.id_post;
    let idComment = req.params.id_comment;
    Comment.findByIdAndDelete(idComment,(err,result)=>{
        if(err || !result){
            req.flash("warning","Something wrong. Please try again");
        }else{
            req.flash("error","You successfully deleted your comment");
            res.redirect("/socio/" + idPost);
        }
    })  
})

module.exports = router;