const express = require ("express");
const passport = require ("passport");
const router = express.Router();
const User = require ("../models/user")

//register
router.get("/register",(req,res)=>{
    res.render("user/register")
})
router.post("/register", (req,res)=>{
    User.register({username: req.body.username},req.body.password,(err,newUser)=>{
        if(err){
            console.log(err);
            res.redirect("/register")
        } else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/socio")
            })
        }
    })
})

//login
router.get("/login",(req,res)=>{
    res.render("user/login")
})
router.post("/login",passport.authenticate("local",{
    successRedirect: "/socio",
    failureRedirect: "/login"
}),(req,res)=>{})

//log out
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
})
//profile
router.get("/profile/:id_user",(req,res)=>{
    res.render("user/profile")
})

module.exports = router;