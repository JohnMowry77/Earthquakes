//documentation
//https:leafletjs.com/examples/quick-start/

//Step 1: store API endpoint (Read Me)
var base_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"


//mapid is div within index.thml
// var myMap= L.map('mapid').setView([40.0150, -105.2705], 10)

// var myMap= L.map('mapid', {
//     center: [40.0150, -105.2705],
//     zoom: 5
// })

// Step 3: Add a tile layer to your map
// use addTo method to add objects to your map.
// Here are the ids you will need for the base maps in the homework:
// gray map: “mapbox/light-v10”
// satellite map: “mapbox/satellite-v9"
// outdoors map: “mapbox/outdoors-v11”


//Step 4: Perform a GET request to the base_url
//https:leafletjs.com/examples/geojson/
d3.json(base_url).then(function(data){
	//Once we get a response, send the data.features object to the CreateFeatures function
	// console.log(data)
	createFeatures(data.features);
});
// https:color-hex.org/color/f57e02
function colorMarker(mag) {
	if (mag <=4) {
		return "#f57e02";
	} else if (4 < mag & mag <=4.5) {
		return "#F68A1B"
	} else if (4.5 < mag & mag <=5) {
		return "#F79734"
	} else if (5 < mag & mag <=5.5) {
		return "#F8A44D"
	} else if (5.5 < mag & mag <=6) {
		return "#F9B167"
	} else {
		return "#FABE80"
	};
}

//function to determine features based on eathquakeData
function createFeatures(earthquakeData) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  //https:leafletjs.com/reference-1.7.1.html#geojson-oneachfeature
	function onEachFeature(feature, layer) {
		layer.bindPopup("<h3>" + feature.properties.place + //location
			"</h3><hr><p>" + new Date(feature.properties.time) + "</p" //time of day ISO 
			+"<p>><b>Magnitude:" + feature.properties.mag + "<b></p>"); //gives you magnitude 
	}

//Create radius function
function circleRadius(mag) {
	return mag * 30000;
}


//Create a GeoJson layer containing the features array on the eathquakeData object
//Run the onEachFeature function once for each piece of data in the array 
// Run pointToLayer function and use latlng which Represents a geographical point with a certain latitude and longitude (documentation)
//https:leafletjs.com/reference-1.7.1.html#latlng (search latlng and pointToLayer)
//https:leafletjs.com/reference-1.7.1.html#point
var earthquakes =L.geoJSON(earthquakeData, {
	pointToLayer: function (earthquakeData, latlng) {
		return L.circle(latlng, {
			"radius" : circleRadius(earthquakeData.properties.mag),
			"color": colorMarker(earthquakeData.properties.mag),
			fillOpacity: 500000
		});
	},
	onEachFeature : onEachFeature
	});

//Sending earthquakes layer to the createMap function
	createMap(earthquakes);
}

function createMap(earthquakes) {
	//define the three different maps
	var lightMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox/light-v10',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: API_KEY
	});

	var outdoorsMap =L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
	    maxZoom: 18,
	    id: 'mapbox/outdoors-v11',
	    tileSize: 512,
	    zoomOffset: -1,
	    accessToken: API_KEY
	});

	var satelliteMap = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
	});

	var baseMaps= {
		"Light Map": lightMap,
		"Outdoors Map": outdoorsMap,
		"Satellite": satelliteMap
	};

	var overlayMaps ={
		// Put Fault Lines: plates here if you do bonus
		Earthquakes: earthquakes
	};
	//Step : create map
	// var myMap= L.map('mapid').setView([40.0150, -105.2705], 10)
	var myMap =L.map("mapid", {
		center: [
		40.0150, -105.2705
		],
		zoom:3,
		layers: [lightMap, earthquakes] //include plates overlay
	});
	// lay control to pass in our baseMaps and overlayMaps //add to map
	L.control.layers(baseMaps, overlayMaps, {
		collapsed: false
	}).addTo(myMap);

	//a location in Boulder, CO
	L.circle([40.01254656535285, -105.30987744617616], {
		color: "yellow",
		fillColor: "green",
		fillOpacity: 50,
		radius: 2000
	}).addTo(myMap);

	// var info = L.control({
	// 	position: "bottomleft"
	// });
	//  info.onAdd = function () {
	//  	var div = L.DomUtil.create("div", "legend info");
	//  	return div;
	//  }

	//  info.addTo(myMap);

	//  document.querySelector(".legend").innterHTML=displayLegend();

	//bonus:
	//star here: https:github.com/fraxen/tectonicplates
 	// Take raw data from fraxen: https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_plates.json
 	// put this in jsonformatter 
 	var plates = "https:raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"

 	d3.json(plates, function(data) {
 		L.geoJson(data)
 	})
 	//

	}
//Create Markers function
// function Markers(response) {
// // 	earthquakes.features.forEach(quake => {
// 	var earthquakes =response.features;;
// 	var markers = []

// 	for (var i =0; i< earthquakes.length; i++) {
// 		var earthquake =earthquakes[i];
// 		var marker = L.circleMarker([earthquake.geomertry.coordinates[1],earthquake.geometry.coordinates[0]], {
// 				"color" : "black",
// 				weight: 0.2,
// 				fillColor: colorMarker(earthquake.properties.mag),
// 				fillOpacity: 0.75,
// 				radius: earthquake.properties.mag *2
// 			}
// 			).bindPopup("<h4>" + earthquake.properties.place + "</h4><hr><p>" + new Date (earthquake.properties.time) + "</p>" + "<p><b>Text: " + earthquake.properties.mag + "<b></p>");
			 
// 		markers.push(marker);
// 	}
// 	createMap(L.layerGroup(marker));
// }
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


// var myIcon = L.icon({
//     'iconUrl': "https://img.icons8.com/doodle/48/000000/apple.png",
//     // iconUrl: 'my-icon.png',
//     'iconSize': [20, 20],
//     'iconAnchor': [0, 0],
