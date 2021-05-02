//documentation
//https:leafletjs.com/examples/quick-start/

// store API endpoint (Read Me)
var base_url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

//mapid is div within index.thml
// var myMap= L.map('mapid').setView([40.0150, -105.2705], 10)

// var myMap= L.map('mapid', {
//     center: [40.0150, -105.2705],
//     zoom: 5
// })

// Add a tile layer to your map
// use addTo method to add objects to your map.
// Here are the ids you will need for the base maps in the homework:
// gray map: “mapbox/light-v10”
// satellite map: “mapbox/satellite-v9"
// outdoors map: “mapbox/outdoors-v11”

//Perform a GET request to the base_url
//https:leafletjs.com/examples/geojson/
//https:bost.ocks.org/mike/leaflet/
d3.json(base_url).then(function(data){
	//Once we get a response, send the data.features object to the CreateFeatures function
	// console.log(data)
	createFeatures(data.features);
});
// https:color-hex.org/color/f57e02
function colorMarker(depth) { //USE THIS FOR LEGEND ADJUST 
	if (depth <=20) {
		return "#7cfc00";
	} else if (21 < depth & depth <=48) {
		return "#ffa500"
	} else if ( 49< depth & depth <=80) {
		return "#dc143c"
	} else if (99 < depth & depth <=400) {
		return "#ff0000"
	// } else if (5.5 < mag & mag <=20) {
	// 	return "#F9B167"
	// } else {
	}else {
		return "#00801a"
	};
}	

//function to determine features based on eathquakeData
function createFeatures(earthquakeData) {
  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the place and time of the earthquake
  //https:leafletjs.com/reference-1.7.1.html#geojson-oneachfeature

  //https:scedc.caltech.edu/recent/glossary.html
  //Horizontal distance from the epicenter to the nearest station (in km). 
  //In general, the smaller this number, the more reliable is the calculated depth of the earthquake.
	function onEachFeature(feature, layer) {
		layer.bindPopup("<h3>" + feature.properties.place + //location
			"</h3><hr><p>" + new Date(feature.properties.time) + "</p" //time of day ISO 
			+"<p>><b>magnitude:" + feature.properties.mag + "<b></p>" 
			+"<p>><b>url:" + feature.properties.status + "<b></p>"
			+"<p>><b>tsunami:" + feature.properties.tsunami + "<b></p>" 
			+"<p>><b>dmin:" + feature.properties.dmin + "<b></p>"			 
			+"<p>><b>depth:" + feature.geometry.coordinates[2] + "<b></p>"
			); //gives you magnitude 
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
			"radius" : circleRadius(earthquakeData.properties.mag), //
			"color": colorMarker(earthquakeData.geometry.coordinates[2]), //come back and
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

	var plates = "https:raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
// //raw.githubusercontent.com/fraxen/tectonicplates/b53c3b7d82afd764650ebdc4565b9666795b9d83/GeoJSON/PB2002_plates.json

	d3.json(plates).then(function(data) {
	// console.log(data)

// 		//https:leafletjs.com/examples/geojson/
	const plate= L.geoJSON(data, {
		color: "#C7505A",
		weight: 1,
		opacity: 1,
		}) //https:leafletjs.com/reference-1.7.1.html#layer (search L.geoJson)
	
	//https:leafletjs.com/examples/layers-control/
	//https:leafletjs.com/reference-1.7.1.html#layergroup
	var overlayMaps ={
		'Faultline': plate,
		'Earthquakes': earthquakes
	};
	// create map
	// var myMap= L.map('mapid').setView([40.0150, -105.2705], 10)
	var myMap =L.map("mapid", {
		center: [
		40.4637, 3.7492 //look for spain
		],
		zoom:2.75,
		layers: [outdoorsMap, earthquakes] //include plates overlay
	});
	// lay control to pass in our baseMaps and overlayMaps //add to map
	L.control.layers(baseMaps, overlayMaps, {
		collapsed: false
	}).addTo(myMap);
	
	//https:leafletjs.com/examples/layers-control/
	//a location in Boulder, CO //Not Required
	L.marker([40.01254656535285, -105.30987744617616]).bindPopup('This is Boulder, CO.').addTo(myMap);
	L.circle([40.01254656535285, -105.30987744617616], {
		color: "yellow",
		fillColor: "green",
		fillOpacity: 50,
		radius: 2000
	}).addTo(myMap);

	//https:leafletjs.com/reference-1.7.1.html#control-layers-option
	//https:leafletjs.com/examples/choropleth/  //Custom Legend control (use example)
	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

	    var div = L.DomUtil.create('div', 'info legend'),
	        earthquake = [0, 10, 20, 50, 80, 100, 400] //,
	        // labels = ["label1", "label2", "label3"]; Can pass array for labels 

	    // loop through our density intervals and generate a label with a colored square for each interval
	    for (var i = 0; i < earthquake.length; i++) {
	        div.innerHTML +=
	            '<i style="background:' + colorMarker(earthquake[i] + 1) + '"></i> ' +
	            earthquake[i] + (earthquake[i + 1] ? '&ndash;' + earthquake[i + 1] + '<br>' : '+');
	    }

	    return div;
	};

	legend.addTo(myMap);
});
};

//////////////////////
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
