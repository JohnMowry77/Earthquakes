# leaflet-challenge

## Background

![1-Logo](Images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

### Level 1: Basic Visualization

![2-BasicMap](Images/2-BasicMap.png)

Your first task is to visualize an earthquake data set.

1. **Get your data set**

   ![3-Data](Images/3-Data.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

   ![4-JSON](Images/4-JSON.png)

   Load the GeoJSON file using d3.json:
   	* Once response is given send the data.features object to the CreateFeatures Function. 
   	* Create a ColorMarker function for the legend. Use if else statements to change colors.
   	* Create a createFeatures function, within create a function to run once for each feature in the features array. Give each feature a popup describing the place and time of the earthquake.
   	* Create a circleRadius function for each earthquake circle. This is still being worked on for now. The size is not correct.
   	* Create a GEOJSON layer containing the features array on the earthquakeData object. Run the onEachFeature funciton once for each piece of datay in the array. Run pointToLayer function and use latlng (from documentation) which represents a geographical point with a certain latitude and longitude. https:leafletjs.com/reference-1.7.1.html#latlng (search latlng and pointToLayer)
   	* createMap function by sending earthquakes layer to the function.
   	* Define the three different maps: lightMap, outdoorsMap, satelliteMap
   	* Use the plates json from github and call it plates. "https:raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json"
   	* Load the geoJSON file using d3.json. Once a response is given, use L.geoJSON to draw the plates line. 
   	* Use layers-control and name overlayMaps
   	* Create the map and pass, layers. Set zoom to 2.75
   	* Use L.control to create legend, place legend in bottomright.
   	* Use L.DomUtil.create to create a div with legend-info. This will take two arrays, only one is required. 
   	* Loop through the created array and return div. Then add the legend to the map. 


	![5-Advanced](Images/5-Advanced.png)

	The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.


	*Current issue with size of earthquake. 


