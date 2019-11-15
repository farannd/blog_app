const express = require ("express");
const router = express.Router();

//model
const Socio = require("../models/socio")

//index
router.get("/socio",(req,res)=>{
    Socio.find({},(err,post)=>{
        if(err){
            console.log(err);
        } else{
            res.render("socio/index",{post:post});
        }
    })
})

//new post form
router.get("/socio/new",(req,res)=>{
    res.render("socio/new");
});

//create post
router.post("/socio",(req,res)=>{
    Socio.create(req.body.post,(err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/socio");
        }
    })
});

//show post in new page
router.get("/socio/:id_post",(req,res)=>{
    Socio.findById(req.params.id_post).populate("comment").exec((err,post)=>{
        if(err){
            console.log(err)
        } else{
            res.render("socio/show",{post:post});
        }
    })
})

//edit form
router.get("/socio/:id_post/edit",(req,res)=>{
    Socio.findById(req.params.id_post,(err,post)=>{
        if(err){
            console.log(err);
        } else{
            res.render("socio/edit",{post:post});
        }
    });
});

//update post
router.put("/socio/:id_post",(req,res)=>{
    let idPost = req.params.id_post
    Socio.findByIdAndUpdate(idPost,req.body.post,(err,post)=>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/socio/" + idPost);
        }
    })
});

//delete post
router.delete("/socio/:id_post",(req,res)=>{
    let idPost = req.params.id_post;
    Socio.findByIdAndDelete(idPost,(err,result)=>{
        if(err){
            console.log(err);
        } else{
            res.redirect("/socio");
        }
    })
})

module.exports = router; 