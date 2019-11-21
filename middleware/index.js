const User = require ("../models/user");
const Socio = require ("../models/socio");

var middleware = {
    //check if user logged in
    isLoggedIn: (req,res,next)=>{
        if(req.isAuthenticated()) return next();
        req.flash("warning","You must log in first to use this features");
        return res.redirect("/login");
    },
    //check if user logged out
    isLoggedOut: (req,res,next)=>{
        if(!req.isAuthenticated()) return next();
        req.flash("warning","You already logged in");
        return res.redirect("/socio")
    },
    //check authorization for post
    checkPostOwnership: (req,res,next)=>{
        if(req.isAuthenticated()){
            let idPost = req.params.id_post;
            Socio.findById(idPost,(err,foundPost)=>{
                if(err || !foundPost){
                    req.flash("warning","Post is not found")
                    return res.redirect("/socio");
                } else if(foundPost.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("warning","You don't have permission to make a change on this post");
                    return res.redirect("/socio");
                }
            })
        } else{
            req.flash("warning","You must log in first to use this features");
            return res.redirect("/login");
        }
        
    },
    //check authorization for comment
    checkCommentOwnership: (req,res,next)=>{
        if(req.isAuthenticated()){
            let idPost = req.params.id_post;
            let idComment = req.params.id_comment;
            Comment.findById(idComment,(err,foundComment)=>{
                if(err || !foundComment){
                    req.flash("warning","Comment is not found");
                    return res.redirect("/socio/" + idPost);
                } else if(foundComment.author.id.equals(req.user._id)){
                    next();
                } else{
                    req.flash("warning","You don't have permission to make a change on this post");
                    return res.redirect("/socio/" + idPost);
                }
            })
        } else{
            req.flash("warning","You must log in first to use this features");
            return res.redirect("/login");
        }
    }
}

module.exports = middleware;