var mongoURL = "mongodb://localhost:27017/sensor_db";
var mongo = require("./mongo");

//user signup
function signup(req,res) {
	res.render("signup");
}

//render login page
function login(req,res) {
	res.render("login");
}

//render billing page
function billing(req,res) {
	res.render("billing",{firstname:req.session.userfirstname, lastname:req.session.userlastname});
}

//render maps
function map(req,res) {
	res.render("map",{firstname:req.session.userfirstname, lastname:req.session.userlastname});
}

//render landing page
function index(req,res) {
	res.render("index");
}

//render user dashboard
function userDashboard(req,res) {
	res.render("userDashboard",{firstname:req.session.userfirstname, lastname:req.session.userlastname});
}

//render admin dashboard
function adminDashboard(req,res) {
	res.render("adminDashboard",{firstname:req.session.adminfirstname, lastname:req.session.adminlastname});
}

//logging out of system
function logout(req,res) {
	req.session.destroy();
	res.render("index");
}

//render request data
function requestData(req,res) {
	res.render("requestSensorData");
}

//get bill list from mongo and display on dashboard
function getBillList(req,res) {
	  console.log("inside getBill List of home.js");
	  var json_responses={};
		mongo.connect(mongoURL, function() {
			console.log('connected to mongo at: ' + mongoURL);
			var coll = mongo.collection('sensorUsage');
			coll.find({"current":{$eq :1},"email":req.session.email}).toArray(function(err, user) {
				if (user) {
					console.log("The data retrieved is: "+ JSON.stringify(user));
					console.log("Success retrieving the data!!");
					json_responses.statusCode  = 200;
					//json_responses = {statusCode : 200};	
					console.log("session variable of counter is : "+req.session.counter);
					json_responses.billDetails= user;
					console.log("response from home.js getBillList: " +JSON.stringify(user));
					//json_responses = {billDetails : user};
					res.send(json_responses);
				} else {
					console.log("Error while fetching the data");
					json_responses = {statusCode : "401"};
					res.send(json_responses);
					
				}
			});
		});
}

//signup API
function addUser(req, res){
	var json_responses={};
	console.log("Inside home addUser");
	var firstname = req.param("firstname"); 
	var lastname = req.param("lastname"); 
	var password = req.param("password");
	var cpswd = req.param("cpswd");
	var email = req.param("email");
	var phone = req.param("phone");
	var address = req.param("address");
	var state = req.param("state");
	var country = req.param("country");
	var city = req.param("city");
	var gender = req.param("gender");

console.log("firstname: "+firstname);
console.log("gender: "+gender);

mongo.connect(mongoURL, function() {
	console.log('connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('userDetails');
	
	coll.insert({firstname : firstname, lastname : lastname, password : password, cpswd : cpswd, email : email, phone : phone, address : address, state : state, country : country, city : city, gender : gender, flag:0}, function(err,user){
		if (user) {
			console.log("values successfully inserted");
			json_responses.statusCode= 200;
			res.send(json_responses);
		} 
	});
});
}

//Login API
function userLogin(req,res){
	var json_responses={};		
	console.log("In home login");
	console.log("email: "+req.param("email"));
	console.log("pwd: "+req.param("password"));
	var login = req.param("login");
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);	
		var coll = mongo.collection('userDetails');
		console.log("Fetching data from db");
		coll.findOne({email: req.param("email"),password: req.param("password")}, function(err, user){
			if(user) {
				var currentdate = new Date(); 
				console.log("currentHour is : "+currentdate.getHours());
				if(login == "userLogin")
					{
				req.session.useremail = user.email;
				req.session.userfirstname = user.firstname;
				req.session.userlastname = user.lastname;
					}
				else if(login == "adminLogin")
					{
					req.session.adminemail = user.email;
					req.session.adminfirstname = user.firstname;
					req.session.adminlastname = user.lastname;
					}
				//console.log("session set to : "+req.session.email);
				console.log("From login in mongo: "	+ JSON.stringify(user));			
				json_responses.statusCode= 200;
				json_responses.data= user;
				console.log("Returning value(home.js): " + JSON.stringify(json_responses));
				res.send(json_responses);
			} else {						
				json_responses.statusCode= 404;
				console.log("Returning errorv(home.js): " + JSON.stringify(json_responses));
				res.send(json_responses);
			}							
		});
	});		
};

//Get data for dropdown on request water quality page
function getData(req,res){
	var json_responses={};
	console.log("Inside sensor.js addSensor");	
	var location = req.param("location");
	console.log("location name is : "+location);

	mongo.connect(mongoURL, function(){	
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection("sensorMetadata");
	
		console.log("The collection is: "+coll);
		
		coll.find({activate:{$eq :"active"},deleted:{$eq:0},location:{$eq:location}},{"sensorname":1}).toArray(function(err, user){

			if (user) {
				console.log("success");
				console.log("What is user: "+JSON.stringify(user));
				json_responses.statusCode= 200;
				json_responses.schools= user;
				res.send(json_responses);
				
			} else {
				console.log("returned false");
				json_responses.statusCode= 401;
				res.send(json_responses);
			}
		});
	});
};	

//reset bill after payment
function resetBill(req,res) {
	
	console.log("Inside reset bill module");
	var json_responses={};
	mongo.connect(mongoURL, function() {
		console.log("email is : "+req.session.email);
		
		console.log('connected to mongo at: '+ mongoURL);
		var coll = mongo.collection('sensorUsage');
		req.session.counter = 0;
		coll.update({email: req.session.email}, {$set: {current: 0}},{multi:true},function(err,user){
			if (user) {
				console.log("Success in reseting the bill");
				json_responses.statusCode =200;
				res.send(json_responses);
			} else {
				json_responses.statusCode = 401;				
				console.log("couldn't reset the bill.. Sorry");
				res.send(json_responses);
			}
		});
	});
};

exports.resetBill = resetBill;
exports.getBillList = getBillList;
exports.getData = getData;
exports.requestData = requestData;
exports.logout = logout;
exports.adminDashboard = adminDashboard;
exports.map = map;
exports.billing = billing;
exports.userDashboard = userDashboard;
exports.userLogin = userLogin;
exports.signup= signup;
exports.login= login;
exports.index= index;
exports.addUser = addUser;