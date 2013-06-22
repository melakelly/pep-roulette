this.App = this.App || {};

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
	"family",
	"pets",
	"work",
	"tech",
	"love",
	"friends"
];

App.getCategory = function() {
	var category = App.categories[App.mySwipe.getPos()];
	return category;
}


$(document).ready(function($) {
    App.updateCountdown();
    $('.message').change(App.updateCountdown);
    $('.message').keyup(App.updateCountdown);
});

//Apigee methods
var client = new Usergrid.Client({
    orgName:'cyberneticlove', // Your Usergrid organization name (or apigee.com username for App Services)
    appName:'sandbox' // Your Usergrid app name
});

// Reading data
var peps = new Usergrid.Collection({ "client":client, "type":"peps" });

peps.fetch(
    function() { // Success
    	var pep = peps.getNextEntity()
        var pepText = pep.get("pep"); // Output the first pep

		App.showPep(pepText);

    }, function() { // Failure
        alert("read failed");
    }
);