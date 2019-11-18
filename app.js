//package requirements
const express = require ("express");
const mongoose = require ("mongoose");
const bodyParser = require ("body-parser");
const methodOverride = require ("method-override");
const passport = require ("passport");
const LocalStrategy = require ("passport-local");
const session = require ("express-session");

//general
const app = express();
const port = 3000;
const url = "mongodb://localhost/blogApp";

//routes requirement
const socioRoutes = require ("./routes/socio");
const commentRoutes = require ("./routes/comment");
const userRoutes = require ("./routes/user");

//model requirement
const User = require ("./models/user");

//general app configuration 
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

//authentication configurration
app.use(session({
	secret: "cinta ini membunuhku",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware
app.use((req,res,next)=>{
	res.locals.currentUser = req.user;
	next();
})

//routes configuration
app.use(socioRoutes);
app.use(commentRoutes);
app.use(userRoutes);

app.get("/",(req,res)=>{
    res.render("index");
})

app.listen(port,()=>{
    console.log("app is listening");
})
      