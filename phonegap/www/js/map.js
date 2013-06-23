this.App = this.App || {};

// var Map = L.map('map');

var Map = L.map('map').setView([37.7750, -122.4183], 13);

var cmAttr = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
	cmUrl = 'http://{s}.tile.cloudmade.com/51c0f5a1659d402ab930cdb5fa2a0f73/{styleId}/256/{z}/{x}/{y}.png';

var minimal   = L.tileLayer(cmUrl, {
	styleId: 22677, 
	attribution: cmAttr, 
	maxZoom:15,
	minZoom:11
	});

minimal.addTo(Map);

var circle1 = L.circle([
37.78724,-122.399034], 100, {
    color: '#851c16',
    fillColor: '#851c16',
    fillOpacity: 0.75
}).addTo(Map);

var circle2 = L.circle([
37.789831,-122.424134], 50, {
    color: '#851c16',
    fillColor: '#851c16',
    fillOpacity: 0.75
}).addTo(Map);

Map.makeCircle = function(size) {
	circle2 = L.circle([
		37.78724,-122.399034], size*10, {
	    color: 'red',
	    fillColor: '#851c16',
	    fillOpacity: 0.75
	}).addTo(Map);

	circle2.bindPopup(size + " peps from this location.");
}

Map.fetch = function() {
	var time = Date.now() - 86400000;
	var ql = "select * where created > " + time;

	var options = { 
	   method:'GET', 
	   endpoint:'peps',
	   qs: {
	   	'ql':ql,
	   	'limit':1000
	   }
	}; 

	var diam='string';

	client.request(options, function (err, data) { 
		if (err) { //error 
			console.log(err);
		} else { //success — data will contain raw results from API call 
			console.log(data.entities.length);
			Map.makeCircle(data.entities.length);
		} 
	});	
};

$(Map.makeCircle(10));

window.setInterval(Map.fetch, 2000);