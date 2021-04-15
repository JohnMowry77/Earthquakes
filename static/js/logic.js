//https:leafletjs.com/examples/quick-start/

var base_url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson"

//create the map
var myMap= L.map('mapid').setView([40.0150, -105.2705], 13)

// var myMap= L.map('mapid', {
//     center: [37.7749, -122.4194],
//     zoom: 3
// })

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: API_KEY
}).addTo(myMap);


d3.json(base_url).then(function(data) {
    console.log(data);

});



// var myIcon = L.icon({
//     'iconUrl': "https://img.icons8.com/doodle/48/000000/apple.png",
//     // iconUrl: 'my-icon.png',
//     'iconSize': [20, 20],
//     'iconAnchor': [0, 0],
// });

// Here are the ids you will need for the base maps in the homework:
// gray map: “mapbox/light-v10”
// satellite map: “mapbox/satellite-v9"
// outdoors map: “mapbox/outdoors-v11”

//mapbox://styles/mapbox/light-v10