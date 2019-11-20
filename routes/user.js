const express = require ("express");
const passport = require ("passport")
const User = require ("../models/user");
const router = express.Router();

//register
router.get("/register",(req,res)=>{
    res.render("user/register");
})
router.post("/register",(req,res)=>{
    User.register({username: req.body.username}, req.body.password, (err,result)=>{
        if(err){
            console.log(err);
        } else{
            passport.authenticate("local")(req,res,()=>{
                res.redirect("/socio");
            })
        }
    })
})

//login
router.get("/login",(req,res)=>{
    res.render("user/login");
})
router.post("/login", passport.authenticate("local",{
    successRedirect: "/socio",
    failureRedirect: "/login"
}),(req,res)=>{});

//logout
router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
})

//profile
router.get("/profile/:id_user",(req,res)=>{
    res.render("user/profile");
})

module.exports = router;