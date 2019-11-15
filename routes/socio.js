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
            res.render("socio/index");
        }
    })
});


module.exports = router; 