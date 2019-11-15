const express = require ("express");
const router = express.Router();

//model
const Socio = require("../models/socio")

//index
router.get("/socio",(req,res)=>{
    Socio.find({},(err,post)=>{
        res.render("socio/index",{post:post});
    })
})

//show form new post
router.get("/socio/new",(req,res)=>{
    res.render("socio/new");
});

//create
router.post("/socio",(req,res)=>{
    Socio.create(req.body.post,(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.redirect("/socio");
        }
    })
});

//show post in new page
router.get("/socio/:id_post",(req,res)=>{
    Socio.findById(req.params.id_post,(err,post)=>{
        res.render("socio/show",{post:post});
    })
})

module.exports = router; 