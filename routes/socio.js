const express = require ("express");
const router = express.Router();
const middleware = require ("../middleware/index")

//model
const Socio = require("../models/socio");
const Comment = require("../models/comment");

//index
router.get("/socio",(req,res)=>{
    Socio.find({},(err,post)=>{
        if(err || !post){
            req.flash("warning", err.message);
            return res.redirect("*");
        } else{
            return res.render("socio/index",{post:post});
        }
    })
})

//new post form
router.get("/socio/new",middleware.isLoggedIn,(req,res)=>{
    return res.render("socio/new");
});

//create post
router.post("/socio",middleware.isLoggedIn,(req,res)=>{
    let post = {
        title: req.body.post.title,
        image: req.body.post.image,
        description: req.body.post.description,
        author:{
            id: req.user.id,
            username: req.user.username
        }
    }
    Socio.create(post,(err,result)=>{
        if(err || !result){
            req.flash("warning","There is something wrong. Please try again")
            return res.redirect("/socio");
        } else{
            req.flash("success","You successfully created a new post")
            return res.redirect("/socio");
        }
    })
});

//show post in new page
router.get("/socio/:id_post",(req,res)=>{
    Socio.findById(req.params.id_post).populate("comment").exec((err,post)=>{
        if(err || !post){
            req.flash("warning", err.message)
            return res.redirect("/socio")
        } else{
            return res.render("socio/show",{post:post});
        }
    })
})

//edit form
router.get("/socio/:id_post/edit",middleware.checkPostOwnership,(req,res)=>{
    Socio.findById(req.params.id_post,(err,post)=>{
        if(err || !post){
            req.flash("warning",err.message)
            return res.redirect("/socio")
        } else{
            return res.render("socio/edit",{post:post});
        }
    });
});

//update post
router.put("/socio/:id_post",middleware.checkPostOwnership,(req,res)=>{
    let idPost = req.params.id_post
    Socio.findByIdAndUpdate(idPost,req.body.post,(err,post)=>{
        if(err){
            req.flash("warning", err.message);
            return res.redirect("/socio/" + idPost);
        } else{
            req.flash("success", "You successfully updated your post");
            return res.redirect("/socio/" + idPost);
        }
    })
});

//cascade delete post and comment associated with it
router.delete("/socio/:id_post",middleware.checkPostOwnership,(req,res)=>{
    let idPost = req.params.id_post;
    Socio.findById(idPost,(err,foundPost)=>{
        if(err || !foundPost){
            req.flash("warning",err.message);
            return res.redirect("/socio/" + idPost);
        } else{
            let commentLength = foundPost.comment.length;
            for(let i=0;i<commentLength;i++){
                Comment.findByIdAndDelete(foundPost.comment[i]._id,(err,result)=>{
                    if(err) console.log(err.message); 
                })
            }
            foundPost.deleteOne();
            req.flash("error","You successfully deleted your post");
            return res.redirect("/socio");
        }
    })
})

module.exports = router; 