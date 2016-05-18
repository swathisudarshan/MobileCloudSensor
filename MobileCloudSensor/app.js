
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  ,home = require('./routes/home')
  ,sensor= require('./routes/sensor')
  , http = require('http')
  , path = require('path');

var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);  //passing parameter to expressSession module

var app = express();

//mongo session
app.use(expressSession({
	secret: 'CMPE281_session',
	resave: true,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/users', user.list);

//signup, login, frontpage and dashboard
app.get('/', routes.index);
app.get('/signup', home.signup);
app.get('/login', home.login);
app.get('/home', home.index);
app.get('/adminDashboard',home.adminDashboard);
app.get('/logout', home.logout);
app.post('/addUser',home.addUser);
app.post('/userLogin',home.userLogin);
app.get('/userDashboard',home.userDashboard);

//User dashboard APIs
app.get('/requestData',home.requestData);
app.post('/getDropDownDetails', home.getData);
app.post('/getData', user.getData);
app.get('/map',home.map);

//Billing APIs
app.get('/billing',home.billing);
app.post('/resetBill', home.resetBill);
app.post('/getBillList', home.getBillList);

//manage sensor and Admin Dashboard APIs
app.post('/addNewSensor',sensor.addNewSensor);
app.post('/getSensorDetails',sensor.getSensorDetails);
app.post('/deleteSensor',sensor.deleteSensor);
app.post('/deactivateSensor',sensor.deactivateSensor);
app.post('/activateSensor',sensor.activateSensor);
app.post('/getUserlist',user.getUserlist);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
