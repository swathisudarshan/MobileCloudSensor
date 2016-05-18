var app = angular.module('app', [ "ngRoute", "highcharts-ng" ]);

/*
 * app.config([ '$routeProvider', function($routeProvider) {
 * $routeProvider.when('/requestWater', { controller : 'requestWaterCtrl',
 * templateUrl : 'templates/requestWaterQuality.ejs' }).when('/billing', {
 * controller : 'billingCtrl', templateUrl : '/templates/billing.ejs'
 * }).when('/yearly', { controller : 'yearlyctrl', templateUrl :
 * '/templates/yearlyanalysis.ejs' }) } ]);
 */

app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/requestWater', {
		controller : 'requestWaterCtrl',
		templateUrl : 'templates/requestWaterQuality.ejs'
	})
} ]);





app.controller("locateSensorCtrl", function($scope, $http) {
	console.log("Inside locateSensor Controller");

	$scope.generateBill = function(req, res) {
		window.location.assign("/billing");
	}
	$scope.locateSensor = function(req, res) {
		window.location.assign("/map");
	}

	$scope.requestData = function(req, res) {
		window.location.assign("/requestData");
	}

});

app.controller("billingCtrl", function($scope, $http) {
	console.log("Inside billing Controller");

	$scope.generateBill = function(req, res) {
		window.location.assign("/billing");
	}
	$scope.locateSensor = function(req, res) {
		window.location.assign("/map");
	}

	$scope.requestData = function(req, res) {
		window.location.assign("/requestData");
	}
	
	$scope.payBill = function(){
		
		
		
		
		
		console.log("inside payBill ctrl -- Adding bill details to DB");
    	console.log("card holder is: "+$scope.cardHolderName);
    	console.log("card number is: "+$scope.cardNumber);
    	console.log("card expiry date is: "+$scope.expiry);
    	console.log("cvv is: "+$scope.cvv);
    	console.log("password is: "+$scope.password);
    	$http({
    		method : "POST",
    		url : "/addUser",
    		data : {
    			"firstname" : $scope.firstname,
    			"lastname" : $scope.lastname,
    			"password" : $scope.password,
    			"cpswd" : $scope.cpswd,
    			"email" : $scope.email,
    			"phone" : $scope.phone,
    			"address" : $scope.address,
    			"state" : $scope.state,
    			"country" : $scope.country,
    			"city" : $scope.city,
    			"gender" : $scope.gender
    		}
    	}).success(function (res){
    		if(res.statusCode == 200)
    		{ 
    			console.log("successfully signed up");
    			$("#success-alert1").show();
	            $("#success-alert1").fadeTo(2000, 1000).slideUp(1000, function(){
	            window.location.assign("/login");
	            });
    		  		
    		}
    		}).error(function (res){
    		console.log("error while sign up");
    	});

	}
});









app.controller("requestWaterCtrl", function($scope, $http) {
	$scope.generateBill = function(req, res) {
		window.location.assign("/billing");
	}
	$scope.locateSensor = function(req, res) {
		window.location.assign("/map");
	}

	$scope.requestData = function(req, res) {
		window.location.assign("/requestData");
	}

	
	console.log("Inside Request Water Controller");
	$http({
		method : "POST",
		url : '/getData',
		data : {}
	}).success(function(data) {
		if (data.statusCode == 401) {
			console.log("error");
		} else {
			$scope.tuitionjson = data.schools;
			console.log("Output is" + JSON.stringify($scope.tuitionjson));
			console.log("Success");
		}
	}).error(function(error) {
		console.log("error");
	});

	$scope.highchartsNG = {
		options : {
			chart : {
				type : 'line',
				events : {
					redraw : function() {
					}

				}
			}
		},
		series : [ {
			color : $scope.barcolor,
			data : []
		} ],
		title : {
			text : 'Air Temperature'
		},
		xAxis : {
			title : {
				text : 'Time'
			},
			categories : []
		},
		yAxix : {

		},
		loading : false
	}

	angular.forEach($scope.tuitionjson, function(item) {
		console.log("BEFORE ITEM LIST");
		console.log("Items list " + JSON.stringify(item));
		$scope.highchartsNG.xAxis.categories.push(item.time);
	})

	$scope.xSeriesArray = [];
	angular.forEach($scope.tuitionjson, function(item) {
		console.log("Item: " + item);
		$scope.xSeriesArray.push(item.air_temperature)
	})
	$scope.highchartsNG.series[0].data = $scope.xSeriesArray;

	$scope.barcolor = '#166D9C';

	$scope.selectedItemChanged = function() {

		console.log($scope.selection);
		if ($scope.selection == 'oceanside') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.air_temperature)
			})
			$scope.barcolor = '#166D9C';

		} else if ($scope.selection == 'Humboldt') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.earn)
			})
			$scope.barcolor = '#1F9C16'

		} else if ($scope.selection == 'San Francisco') {
			$scope.xSeriesArray = [];
			angular.forEach($scope.tuitionjson, function(item) {
				console.log(item);
				$scope.xSeriesArray.push(item.Comp)
			})
			$scope.barcolor = '#8B9C16'
		}
		$scope.highchartsNG.series[0].data = $scope.xSeriesArray;

		// $scope.highchartsNG.options.chart.redraw();
	}

});
