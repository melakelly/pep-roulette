var map = L.map('map').setView([37.7750, -122.4183], 13);


var cmAttr = 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2011 CloudMade',
	cmUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/{styleId}/256/{z}/{x}/{y}.png';

var minimal   = L.tileLayer(cmUrl, {styleId: 22677, attribution: cmAttr}),
	midnight  = L.tileLayer(cmUrl, {styleId: 999,   attribution: cmAttr}),
	motorways = L.tileLayer(cmUrl, {styleId: 46561, attribution: cmAttr});

minimal.addTo(map);

var circle = L.circle([
37.78724,-122.399034], 100, {
    color: '#851c16',
    fillColor: '#851c16',
    fillOpacity: 0.75
}).addTo(map);