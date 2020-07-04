//package requirements
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');

//general
const app = express();
const port = process.env.PORT || 3000;
const url = process.env.DATABASEURL;

//routes requirement
const socioRoutes = require('./routes/socio');
const commentRoutes = require('./routes/comment');
const userRoutes = require('./routes/user');

//model requirement
const User = require('./models/user');

//mongoose configuration
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
});

//authentication configurration
app.use(
	session({
		secret: 'kepoin aja',
		resave: false,
		saveUninitialized: false
	})
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//general app configuration
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());
app.set('view engine', 'ejs');

//routes configuration
app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	res.locals.success = req.flash('success');
	res.locals.error = req.flash('error');
	res.locals.warning = req.flash('warning');
	next();
});
app.use(socioRoutes);
app.use(commentRoutes);
app.use(userRoutes);

//landing page
app.get('/', (req, res) => {
	res.render('index');
});

//404
app.get('*', (req, res) => {
	res.send('URL NOT FOUND');
});

//server listening config
app.listen(port, process.env.IP, () => {
	console.log('app is listening');
});
