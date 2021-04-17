//documentation
//https:leafletjs.com/examples/quick-start/

//Step 1: store API endpoint
var base_url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

//Step 2: create map
//mapid is div within index.thml
// var myMap= L.map('mapid').setView([40.0150, -105.2705], 10)

// var myMap= L.map('mapid', {
//     center: [40.0150, -105.2705],
//     zoom: 5
// })

// Step 3:Add a tile layer to your map
// use addTo method to add objects to your map.
// Here are the ids you will need for the base maps in the homework:
// gray map: “mapbox/light-v10”
// satellite map: “mapbox/satellite-v9"
// outdoors map: “mapbox/outdoors-v11”


//Perform a GET request to the base_url
//https:leafletjs.com/examples/geojson/
d3.json(base_url).then(function(data){
	// console.log(data)
	createFeatures(data.features);
});

// d3.json(base_url, function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function
//   createFeatures(data.features);
// });


function createFeatures(earthquakeData) {
	function onEachFeature(feature, layer) {
		layer.bindPopup("h3>" + feature.properties.place +
		"</h3>" + new Date(feature.properties.time) + "</p");
	}

var earthquakes =L.geoJSON(earthquakeData, {
	onEachFeature: onEachFeature
});

createMap(earthquakes);
// }

function createMap(earthquakes) {

	var light = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox/light-v10',
	    // id: 'mapbox/outdoors-v11',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: API_KEY
	});

	var outdoors =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    // id: 'mapbox/light-v10',
	    id: 'mapbox/outdoors-v11',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: API_KEY
	});

	var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    // id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
	});

	var baseMaps= {
		"Light Map": light,
		"Outdoors Map": outdoors,
		"Satellite": satellite
	};

	var overlayMaps ={
		Earthquakes: earthquakes
	};

	// var myMap= L.map('mapid').setView([40.0150, -105.2705], 10)
	var myMap =L.map("mapid", {
		center: [
		40.0150, -105.2705
		],
		zoom:2,
		layers: [light, earthquakes]
	});

	L.control.layers(baseMaps, overlayMaps, {
		collapsed: false
	}).addTo(myMap);


	L.circle([40.214770, -105.630282], {
		color: "yellow",
		fillColor: "green",
		fillOpacity: 0.75,
		radius: 2000
	}).addTo(myMap);

	// L.polygon ([
	// 	//lat, lon (has to be)
	// 	[40.214770, -105.630282],
	// 	[40.05661, -105.19938],
	// 	[36.07634,-86.77964]
	// 	], {
	// 		color: "green",
	// 		fillColor: "green",
	// 		fillOpacity: 0.75
	// 	}).addTo(myMap);
}


// 	var earthquakes =L.geoJSON(earthquakeData, {
// 		onEachFeature: onEachFeature
// 	});

// }


// d3.json(base_url).then(function(data) {
// 	//see data 
//     // console.log(data)
//     createFeatures(data.features);



// });



// var myIcon = L.icon({
//     'iconUrl': "https://img.icons8.com/doodle/48/000000/apple.png",
//     // iconUrl: 'my-icon.png',
//     'iconSize': [20, 20],
//     'iconAnchor': [0, 0],
};