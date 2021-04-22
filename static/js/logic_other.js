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
function colorMarker(mag) { //USE THIS FOR LEGEND ADJUST 
	if (mag <=0) {
		return "#f57e02";
	} else if (9 < mag & mag <=20) {
		return "#F68A1B"
	} else if ( 49< mag & mag <=80) {
		return "#F79734"
	} else if (99 < mag & mag <=400) {
		return "#F8A44D"
	// } else if (5.5 < mag & mag <=20) {
	// 	return "#F9B167"
	// } else {
	}else {
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

	//https:leafletjs.com/examples/layers-control/
	//https:leafletjs.com/reference-1.7.1.html#layergroup
	var overlayMaps ={
		// Put Fault Lines: plates here if you do bonus
		'Earthquakes': earthquakes
	};
	//Step : create map
	// var myMap= L.map('mapid').setView([40.0150, -105.2705], 10)
	var myMap =L.map("mapid", {
		center: [
		40.0150, -105.2705
		],
		zoom:4,
		layers: [lightMap, earthquakes] //include plates overlay
	});
	// lay control to pass in our baseMaps and overlayMaps //add to map
	L.control.layers(baseMaps, overlayMaps, {
		collapsed: false
	}).addTo(myMap);
	
	//https:leafletjs.com/examples/layers-control/
	//a location in Boulder, CO
	L.marker([40.01254656535285, -105.30987744617616]).bindPopup('This is Boulder, CO.').addTo(myMap);
	L.circle([40.01254656535285, -105.30987744617616], {
		color: "yellow",
		fillColor: "green",
		fillOpacity: 50,
		radius: 2000
	}).addTo(myMap);

	 var plates = "https:raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
 // //raw.githubusercontent.com/fraxen/tectonicplates/b53c3b7d82afd764650ebdc4565b9666795b9d83/GeoJSON/PB2002_plates.json

 	d3.json(plates).then(function(data) {
 		// console.log(data)
 	
 // 	d3.json(plates, function(data) {
 // 		//https:leafletjs.com/examples/geojson/
		L.geoJson(data, {
    			color: "#000",
			    weight: 1,
			    opacity: 1,
			}).addTo(myMap); //https:leafletjs.com/reference-1.7.1.html#layer (search L.geoJson)
		// one_point=data['features']['geometry']['coordinates'][0]
	
	});
	//https:leafletjs.com/reference-1.7.1.html#control-layers-option
	// var info = L.control({
	// 	position: "bottomleft"
	// }); //https:leafletjs.com/examples/choropleth/
	//  info.onAdd = function (legend) {
	// 	// https:leafletjs.com/reference-1.7.1.html#domutil
	//  	this._div = L.DomUtil.create("div", "legendinfo");
	//  	this.update();
	//  	return this._div;
	//  };

 // 	info.update = function (props) {
	// this._div.innerHTML = '<h4>Earthquake Magntiude</h4>' +  (props ?
 //    '<b>' + props.name + '</b><br />' + props.density + ' people / mi<sup>2</sup>'
 //    : 'Hover over a state');
	// };

	var legend = L.control({position: 'bottomright'});

	legend.onAdd = function (map) {

	    var div = L.DomUtil.create('div', 'info legend'),
	        grades = [0, 10, 20, 50, 80, 100, 400, 5000] //,
	        // labels = ["label1", "label2", "label3"];

	    // loop through our density intervals and generate a label with a colored square for each interval
	    for (var i = 0; i < grades.length; i++) {
	        div.innerHTML +=
	            '<i style="background:' + colorMarker(grades[i] + 1) + '"></i> ' +
	            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
	    }

	    return div;
	};

	legend.addTo(myMap);

};

//COMEBACK TO ME for BONUS
// var faultlines =L geoJson(plates, {
// 	pointToLayer: function(plates, latlng) {
// 		// one_point=data['features']['geometry']['coordinates'][0]
// 		L.marker([one_point['features']['geometry']['coordinates'][1],one_point['features']['geometry']['coordinates'][0]])
// 	})
// }