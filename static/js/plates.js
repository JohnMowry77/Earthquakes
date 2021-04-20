	//BONUS:

	d3.json(plates).then(function(data) {
		createFeatures(data.features);
	});


	//star here: https:github.com/fraxen/tectonicplates
 	// Take raw data from fraxen: https://github.com/fraxen/tectonicplates/blob/master/GeoJSON/PB2002_plates.json
 	// put this in jsonformatter 
 	var plates = "https:raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
 	//raw.githubusercontent.com/fraxen/tectonicplates/b53c3b7d82afd764650ebdc4565b9666795b9d83/GeoJSON/PB2002_plates.json

 	//d3.json(plates).then(function(data) {
 	// 	console.log(data)
 	// })
 	d3.json(plates, function(data) {
 		//https:leafletjs.com/examples/geojson/
		L.geoJson(data).addTo(earthquakes); //https:leafletjs.com/reference-1.7.1.html#layer (search L.geoJson)
		one_point=data['features']['geometry']['coordinates'][0]
		L.marker([one_point['features']['geometry']['coordinates'][1],one_point['features']['geometry']['coordinates'][0]])
	})	.addTo(myMap);
 		//Need to go to 'features' key, 'geometry' key, 'coordinates' key, grab lat [1] and long [0]
 		//https:leafletjs.com/reference-1.7.1.html#polygon
 	//

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