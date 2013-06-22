this.App = this.App || {};

App.showPep = function(data) {
	$('#pep').html(data);
}

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

var getText = function() {
	var text = $('.message').val();
	console.log(text);
	return text;
}

var updateCountdown = function() {
    // 140 is the max message length
    var remaining = 140 - $('.message').val().length;
    $('.countdown').text(remaining + '/140');
}

$(document).ready(function($) {
    updateCountdown();
    $('.message').change(updateCountdown);
    $('.message').keyup(updateCountdown);
});