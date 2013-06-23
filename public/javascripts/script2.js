this.App = this.App || {};

//event handlers for give functionality
$('#give').bind('click',function() {

	//grab the current category
	var cat = App.getCategory();

	//grab the pep text
	var text = App.getText();

	//set an empty rating
	var rating = 0;
	
	//send to Apigee
	App.newPep(cat,text,rating);

	// refresh
	// App.fetch(cat);
	App.updateCountdown();
	//clear the entry if successful
	$('.message').val('');
});


$(document).ready(function($) {
	App.updateCountdown();
	$('.message').change(App.updateCountdown);
	$('.message').keyup(App.updateCountdown);
	// App.fetch(App.categories[0]);

	$('a').bind('click',function(){
	for (var i = 0; i < $('a').length; i++ ) {
		$('a')[i].classList.remove('selected');
	}
	this.classList.toggle('selected');
	App.getCategory();
});
});
