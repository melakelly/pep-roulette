		this.App = this.App || {};

		App.mySwipe = new Swipe(document.getElementById('slider'), {
			startSlide: 0,
			speed: 400,
			//auto: 3000,
			continuous: true,
			disableScroll: false,
			stopPropagation: false,
			callback: function(index, elem) {
				console.log('index: '+index);
				App.fetch(App.categories[index]);
			},
			transitionEnd: function(index, elem) {}
		});

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
			App.fetch(cat);
			App.updateCountdown();
			//clear the entry if successful
			$('.message').val('');
		});

		$(document).ready(function($) {
			App.updateCountdown();
			$('.message').change(App.updateCountdown);
			$('.message').keyup(App.updateCountdown);
			App.fetch(App.categories[0]);
		});
