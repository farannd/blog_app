const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const methodOverride = require ("method-override");
const app = express();
const port = 3000;
const url = "mongodb://localhost/blogApp"

const homeRoutes = require ("./routes/home")

//app configuration
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");

//mongoose configuration
mongoose.connect(url,{
	useNewUrlParser: true, 
	useUnifiedTopology: true, 
	useFindAndModify: false,
	useCreateIndex: true
});

//routes configuration
app.use(homeRoutes);

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(port,()=>{
    console.log("app is listening");
})
      