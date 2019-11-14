const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const methodOverride = require ("method-override");
const app = express();
const port = 3000;
const url = "mongod://localhost/blogApp"

app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(port,()=>{
    console.log("app is listening");
})
      