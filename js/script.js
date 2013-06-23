this.App = this.App || {};

//Apigee methods
var client = new Usergrid.Client({
    orgName:'cyberneticlove', // Your Usergrid organization name (or apigee.com username for App Services)
    appName:'sandbox' // Your Usergrid app name
});

// Reading data
var peps = new Usergrid.Collection({ "client":client, "type":"peps" });


//pepRoulette methods
App.showPep = function(data) {
	$('#pep').html(data);
}

App.getText = function() {
	var text = $('.message').val();
	return text;
}

App.updateCountdown = function() {
    // 140 is the max message length
    var remaining = 140 - $('.message').val().length;
    $('.countdown').text(remaining + '/140');
}

//array of categories
App.categories = [
		
	"pets",
	"work",
	"tech",
	"love",
	"friends"
];

App.newPep = function(cat, text, rating) {

	var pep = {
		"category": cat,
		"pep": text,
		"rating": rating
	};

	peps.addEntity(pep, function(error,response) {
         if (error) {
         	console.log("write failed");
         } else { 
         	console.log("write succeeded"); 
         }
	});
}


App.getCategory = function() {
	var category = App.categories[App.mySwipe.getPos()];
	return category;
}

App.fetch = function(cat) {
	var ql = "select * where category = " + '\'' + cat + '\'';

	var options = { 
	   method:'GET', 
	   endpoint:'peps',
	   qs: {
	   	'ql': ql
	   }
	}; 

	client.request(options, function (err, data) { 
	   if (err) { 
	      console.log(err);//error 
	   } else { 
	      console.log(data.entities[0].pep);//success — data will contain raw results from API call 

	      App.showPep(data.entities[0].pep);
	   } 
	});	

}

