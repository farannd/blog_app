const express = require ("express");
const router = express.Router();

//index
router.get("/home",(req,res)=>{
    res.render("home/index");
})


module.exports = router; 