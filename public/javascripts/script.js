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
	
	var pepString = '';

	for (i in data) {
		pepString+='<div><p>'+data[i].pep+'</p></div>';
	}
	$('#peps').html(pepString);


	App.pepSwipe = new Swipe(document.getElementById('pepswipe'), {
		startSlide: 0,
		speed: 400,
		// auto: 3000,
		continuous: true,
		disableScroll: false,
		stopPropagation: false,
		callback: function(index, elem) {},
		transitionEnd: function(index, elem) {}
	});
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
	"family",
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
         	console.log("Something went wrong...try again later?");
         } else { 
         	alert("Thanks for the pep!"); 
         }
	});

	// App.fetch(cat);
}


App.getCategory = function() {
	var cat = '';

	for (var i = 0; i < $('a').length; i++) {
		if($('a')[i].classList.contains('selected')){
			var cat = $('a')[i].id;
		}
	}
	return cat;
}

App.fetch = function(cat) {
	var ql = "select * where category = " + '\'' + cat + '\''+' order by created desc';

	var options = { 
	   method:'GET', 
	   endpoint:'peps',
	   qs: {
	   	'ql': ql
	   }
	}; 

	client.request(options, function (err, data) { 
		if (err) { //error 
			console.log(err);
		} else { //success — data will contain raw results from API call 
			App.showPep(data.entities);
		} 
	});	

}

