const express = require ("express");
const router = express.Router();

//register
router.get("/register",(req,res)=>{
    res.render("user/register")
})
router.post("/register",(req,res)=>{
    res.send("YEAH")
})

//login
router.get("/login",(req,res)=>{
    res.render("user/login");
})
router.post("/login",(req,res)=>{
    res.send("YEAH");
})
    
//logout
router.get("/logout",(req,res)=>{
    res.render("user/logout");
})
router.post("/logout",(req,res)=>{
    res.send("YEAH");
})

//profile
router.get("/profile",(req,res)=>{
    res.render("user/profile");
})

module.exports = router;