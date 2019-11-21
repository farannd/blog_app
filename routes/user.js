const express = require ("express");
const passport = require ("passport")
const User = require ("../models/user");
const middleware = require("../middleware/index")
const router = express.Router();

//register
router.get("/register",middleware.isLoggedOut,(req,res)=>{
    return res.render("user/register");
})
router.post("/register",middleware.isLoggedOut,(req,res)=>{
    User.register({username: req.body.username}, req.body.password, (err,result)=>{
        if(err || !result){
            req.flash("warning", err.message);
            return res.redirect("/register");
        } else{
            passport.authenticate("local")(req,res,()=>{
                req.flash("success","Your account successfuly created. Welcome to Socio!")
                return res.redirect("/socio");
            })
        }
    })
})

//login
router.get("/login",middleware.isLoggedOut,(req,res)=>{
    return res.render("user/login");
})
router.post("/login",middleware.isLoggedOut, (req,res,next)=>{
    passport.authenticate("local",(err,user,info)=>{
        if (err) { 
            req.flash("warning",err.message);
            return res.redirect("/login"); 
        }
        if (!user) { 
            req.flash("warning",info.message)
            return res.redirect("/login"); 
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash("warning",info.message);
                return res.redirect("/login");
            }
            req.flash("success","Welcome back " + user.username);
            return res.redirect("/socio");
        });
    })(req, res, next);
});

//logout
router.get("/logout",(req,res)=>{
    req.logout();
    req.flash("success","You successfully logged out")
    return res.redirect("/");
})

//profile
router.get("/profile/:id_user",middleware.isLoggedIn,(req,res)=>{
    return res.render("user/profile");
})

module.exports = router;