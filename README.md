# Major Earthquake Tracker

## Background

![1-Logo](https://user-images.githubusercontent.com/72773479/127752503-66f1f9e4-3458-4444-8d3a-32d0a680a36e.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.


### Level 1: Basic Visualization

![2-BasicMap](https://user-images.githubusercontent.com/72773479/127752504-dd2fcb91-3c05-4840-ae9f-b164115a2796.png)

Your first task is to visualize an earthquake data set.

1. **Get your data set**

![3-Data](https://user-images.githubusercontent.com/72773479/127752505-ec825e44-c25c-453c-a9cb-1aeaa2fbd990.png)

   The USGS provides earthquake data in a number of different formats, updated every 5 minutes. Visit the [USGS GeoJSON Feed](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php) page and pick a data set to visualize. When you click on a data set, for example 'All Earthquakes from the Past 7 Days', you will be given a JSON representation of that data. You will be using the URL of this JSON to pull in the data for our visualization.

![4-JSON](https://user-images.githubusercontent.com/72773479/127752506-d2a9ae04-9dee-408d-86f4-327417cf8faa.png)

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


![5-Advanced](https://user-images.githubusercontent.com/72773479/127752507-9a337df7-be33-468a-b88b-c8201b940e90.png)
![6-Time_Keeps_On_Ticking](https://user-images.githubusercontent.com/72773479/127752510-f038bf63-49a0-4e79-9378-ee8fa1bc9f9d.gif)
![Cluster](https://user-images.githubusercontent.com/72773479/127752511-850292ee-f35f-4864-a889-887fcd5c8da0.png)

	The USGS wants you to plot a second data set on your map to illustrate the relationship between tectonic plates and seismic activity. You will need to pull in a second data set and visualize it along side your original set of data. Data on tectonic plates can be found at <https://github.com/fraxen/tectonicplates>.


![final_outdoor_fault_map](https://user-images.githubusercontent.com/72773479/127752458-76c2950b-83a9-4558-8371-eb4b80c389e8.png)
![final_outdoor_map](https://user-images.githubusercontent.com/72773479/127752460-e2cef7dc-fccb-45e5-8015-a23838cee890.png)
![light_fault_map](https://user-images.githubusercontent.com/72773479/127752461-51b74fdb-049e-4486-a979-292cf127088b.png)
![light_map](https://user-images.githubusercontent.com/72773479/127752462-850b8bd2-1beb-4619-a4af-98d2c1dc73cc.png)
![satellite_fault_map](https://user-images.githubusercontent.com/72773479/127752463-7f9aa1d2-ad3e-4f3a-9a2a-718274616cf9.png)
![satellite_map](https://user-images.githubusercontent.com/72773479/127752465-c172694f-950c-474a-aa03-d782bea52582.png)


