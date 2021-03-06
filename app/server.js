const port = 8080;
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const validator = require('express-validator');
const engines = require('consolidate');


//new


const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const userModel=require('./models/user.model');


//This function will allow us to retrict the access to the routes
global.secure = function(type) {
	return function (request, response, next) {
		if (request.isAuthenticated()) {
			if (type) {
				if (type === request.user.type) {
					return next();
				}else{
					response.redirect('/');
				}
			}else{
				return next();
			}			
		}
		response.redirect('/');
	}
};
//end of 

app.use(validator());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

//new
app.use(cookieParser());
app.use(session({
	secret: 'someRandomSecretKey',							
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(username, callback) {
	callback(null, username);
});

passport.deserializeUser(function(username, callback) {
	userModel.read(username, function(data) {
		callback(null, data);
	})
});

//end of new

app.set('view engine', 'ejs');
app.set('views','views');

global.connection = mysql.createConnection({
	host     : 'webitcloud.net',
	//host     : 'localhost',
	user     : 'webitclo_A255',
	//user     : 'root',
	password : 'PW1718A255625',
//	password : 'renova98',
	database : 'webitclo_A255',
}).on('enqueue', function (sequence) {
	if ('Query' === sequence.constructor.name) {
		console.log(sequence.sql);
	}
});

app.listen(port, function(){
	console.log('Server started at: ' + port);
});

//Midleware that sets the isAuthenticated variable in all views

app.use(function(request, response, next){
	response.locals.user = request.user;
	response.locals.isAuthenticated = request.isAuthenticated();
	next();
});



app.use('/', require('./controllers/home.route'));
app.use('/public', express.static('public'));
app.use('/login', require('./controllers/login.route'));
app.use('/admin', require('./controllers/admin.route'));
app.use('/registo', require('./controllers/registo.route'));
app.use('/patrocinio', require('./controllers/patrocinio.route'));
app.use('/speaker', require('./controllers/speaker.route'));
app.use('/logout', require('./controllers/logout.route'));
app.use('/colaborador', require('./controllers/colaborador.route'));
app.use('/participante', require('./controllers/participante.route'));
app.use('/info', require('./controllers/info.route'));
app.use('/sessoes', require('./controllers/sessoes.route'));
app.use('/dia', require('./controllers/dia.route'));




/* 
app.use('/colab', require('./controllers/colab.route'));
app.use('/public', express.static('public'));
//app.use('/users', require('./controllers/user.route'));

//new

app.use('/registo', require('./controllers/registo.route'));
app.use('/logout', require('./controllers/logout.route'));
//app.use('/profile', require('./controllers/profile.route')); */