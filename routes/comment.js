const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Comment = require ("../models/comment");

//new form
router.get("/socio/:id_post/comment/new",(req,res)=>{
    let idPost = req.params.id_post;
    res.render("comment/new", {idPost: idPost})
});

//create
router.post("/socio/:id_post/comment",(req,res)=>{
    let idPost = req.params.id_post;
    Comment.create(req.params.comment, (err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/socio/" + idPost);
        }
    });
});

//edit form
router.get("/socio/:id_post/comment/:id_comment", (req,res)=>{
    res.render("comment/edit");
});

module.exports = router;