const express = require ("express");
const passport = require ("passport")
const User = require ("../models/user");
const middleware = require("../middleware/index")
const router = express.Router();

//register
router.get("/register",middleware.isLoggedOut,(req,res)=>{
    res.render("user/register");
})
router.post("/register",middleware.isLoggedOut,(req,res)=>{
    User.register({username: req.body.username}, req.body.password, (err,result)=>{
        if(err || !result){
            req.flash("warning", err.message);
        } else{
            passport.authenticate("local")(req,res,()=>{
                req.flash("success","Your account successfuly created. Welcome to Socio!")
                res.redirect("/socio");
            })
        }
    })
})

//login
router.get("/login",middleware.isLoggedOut,(req,res)=>{
    res.render("user/login");
})
router.post("/login",middleware.isLoggedOut, passport.authenticate("local",{
    successFlash: true,
    successRedirect: "/socio",
    failureFlash: true,
    failureRedirect: "/login"
}),(req,res)=>{});

//logout
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","You successfully logged out")
    res.redirect("/");
})

//profile
router.get("/profile/:id_user",middleware.isLoggedIn,(req,res)=>{
    res.render("user/profile");
})

module.exports = router;