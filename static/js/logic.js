//documentation
//https:leafletjs.com/examples/quick-start/

//Step 1: store API endpoint
var base_url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"


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

function Colormarker(mag) {
	if (mag <=2) {
		return "#23348c";
	} else if (2 < mag & mag <=3) {
		return "#4d5db3"
	} else if (3 < mag & mag <=4) {
		return "#39585c"
	} else if (4 < mag & mag <=5) {
		return "#86b9bf"
	} else if (5 < mag & mag <=6) {
		return "#cf7508"
	} else {
		return "#8a500a"
	};
}

//function to determine features based on eathquakeData
function createFeatures(earthquakeData) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
	function onEachFeature(feature, layer) {
		layer.bindPopup("<h3>" + feature.properties.place + //location
			"</h3><hr><p>" + new Date(feature.properties.time) + "</p" //time of day ISO 
			+"<p>><b>Magnitude:" + feature.properties.mag + "<b></p>"); //gives you magnitude 
	}

//Create a GeoJson layer containing the features array on the eathquakeData object
//Run the onEachFeature function once for each piece of data in the array 
var earthquakes =L.geoJSON(earthquakeData, {
	onEachFeature: onEachFeature
});

//Sending earthquakes layer to the createMap function
createMap(earthquakes);
// }

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
		Earthquakes: earthquakes
	};
	//Step : create map
	// var myMap= L.map('mapid').setView([40.0150, -105.2705], 10)
	var myMap =L.map("mapid", {
		center: [
		40.0150, -105.2705
		],
		zoom:2,
		layers: [lightMap, earthquakes]
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

	};
//Create Markers function
function Markers(response) {
// 	earthquakes.features.forEach(quake => {
	var earthquakes =response.features;;
	var markers = []

	for (var i =0; i< earthquakes.length; i++) {
		var earthquake =earthquakes[i];
		var marker = L.circleMarker([earthquake.geomertry.coordinates[1],earthquake.geometry.coordinates[0]], {
				"color" : "black",
				weight: 0.2,
				fillColor: colorMarker(earthquake.properties.mag),
				fillOpacity: 0.75,
				radius: earthquake.properties.mag *2
			}
			).bindPopup("<h4>" + earthquake.properties.place + "</h4><hr><p>" + new Date (earthquake.properties.time) + "</p>" + "<p><b>Text: " + earthquake.properties.mag + "<b></p>");
			 
		markers.push(marker);
	}
	createMap(L.layerGroup(marker));
}
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

};
// var myIcon = L.icon({
//     'iconUrl': "https://img.icons8.com/doodle/48/000000/apple.png",
//     // iconUrl: 'my-icon.png',
//     'iconSize': [20, 20],
//     'iconAnchor': [0, 0],
