const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Comment = require ("../models/comment");
const Socio = require ("../models/socio");

//new form
router.get("/socio/:id_post/comment/new",(req,res)=>{
    let idPost = req.params.id_post;
    res.render("comment/new", {idPost: idPost})
});

//create
router.post("/socio/:id_post/comment", (req,res)=>{
    let idPost = req.params.id_post;
    let comment = req.body.comment;
    
    Socio.findById(idPost,(err,socioFound)=>{
        if(err){
            console.log(err);
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
                            res.redirect("/socio/" + idPost);
                        }
                    })
                }
            })
        }
    })
})

//edit form
router.get("/socio/:id_post/comment/:id_comment/edit", (req,res)=>{
    let idPost = req.params.id_post;
    let idComment = req.params.id_comment;
    Comment.findById(idComment,(err,foundComment)=>{
        if(err){
            console.log(err);
        } else{
            console.log(foundComment);
            res.render("comment/edit", {commentValue:foundComment, idPost:idPost});
        }
    })
});

//update
router.put("/socio/:id_post/comment/:id_comment", (req,res)=>{
    let idPost = req.params.id_post;
    let idComment = req.params.id_comment;
    let comment = req.body.comment;
    Comment.findByIdAndUpdate(idComment,comment,(err,commentUpdate)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/socio/" + idPost);
        }
    })
})

//delete
router.delete("/socio/:id_post/comment/:id_comment",(req,res)=>{
    let idPost = req.params.id_post;
    let idComment = req.params.id_comment;
    Comment.findByIdAndDelete(idComment,(err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect("/socio/" + idPost);
        }
    })  
})

module.exports = router;