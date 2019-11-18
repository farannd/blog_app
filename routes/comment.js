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

router.get("/socio/:idPost/comment", (req,res)=>{
    let idPost = req.params.idPost;
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
router.get("/socio/:id_post/comment/:id_comment", (req,res)=>{
    res.render("comment/edit");
});

//update

//delete

module.exports = router;