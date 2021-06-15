
mapboxgl.accessToken = 'pk.eyJ1IjoieWlob3U5OCIsImEiOiJja29kOWx2ZzEwMDhuMnV0cmY3eGJmdTdrIn0.P896bZB3ddlNqt5ANjYU6A';

mapMarkerstesco = [];
mapMarkersasda = [];
mapMarkerswaitrose = [];
mapMarkerssainsburys = [];
mapMarkerslidl = [];
mapMarkersaldi = [];


var map = new mapboxgl.Map({
    container: 'map_container',
    style: 'mapbox://styles/yihou98/ckofvsx2q1ohn18murzz9vdar',
    center: [-0.118, 51.509] ,
    zoom: 9
});

		
// Disable zoom on double click
map.doubleClickZoom.disable();



// When map loads...
map.on('load', function() {

    map.addSource('grocery', {
	generateId: true,// This ensures that all features have unique IDs
	type: 'geojson',
	// Use a URL for the value for the `data` property.
	data: 'https://raw.githubusercontent.com/JPRichtmann/Grocery-Nutrition_Website/main/data/grocerypoint.json'
	 // This ensures that all features have unique IDs
	
	});
	map.addSource('msoa', {
	generateId: true,// This ensures that all features have unique IDs
	type: 'geojson',
	// Use a URL for the value for the `data` property.
	data: 'https://raw.githubusercontent.com/JPRichtmann/Grocery-Nutrition_Website/main/data/msoa2.json'
	// This ensures that all features have unique IDs
	
	});
 
	map.addLayer({
		'id': 'grocerycluster',
		'type': 'fill',
		'source': 'msoa',
		'paint': {
			'fill-color': ['match',
			['get', 'group.csv.group'],
			1,'#e33535',
			/* other */ 'rgba(27,38,44, 0.0)'],
			'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.7
			]
			}
		});
 	map.addLayer({
		'id': 'commonarea',
		'type': 'fill',
		'source': 'msoa',
		'paint': {
			'fill-color': ['match',
			['get', 'group.csv.group'],
			0,'#faf6e5',
			/* other */ 'rgba(27,38,44, 0.0)'],
			'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.7
			]
			}
		});
 	map.addLayer({
		'id': 'fooddesert',
		'type': 'fill',
		'source': 'msoa',
		'paint': {
			'fill-color': ['match',
			['get', 'group.csv.group'],
			-1,'#448bab',
			/* other */ 'rgba(27,38,44, 0.0)'],
			'fill-opacity': [
              'case',
              ['boolean', ['feature-state', 'hover'], false],
              1,
              0.7
			]
			}
		});

    

		
      });

 
    // Store which msoa is being hovered over or clicked on
    var msoaID = null;
    var msoaIDClick = null;

    ///////////////////////////////////////////////////////////////////////////

    // When the mouse hovers over the msoa, change the opacity
    map.on('mousemove', 'grocerycluster', function(e) {

      map.getCanvas().style.cursor = 'pointer';

      // Check that the feature exits
      if (e.features.length > 0) {
        if (msoaID) {
          map.setFeatureState(
            { source: 'msoa', id: msoaID },
            { hover: false }
          );
        }

        msoaID = e.features[0].id;

        map.setFeatureState(
          { source: 'msoa', id: msoaID },
          { hover: true }
        );
	}});

     

    ///////////////////////////////////////////////////////////////////////////

    // When the mouse leaves the borough, return opacity to normal
    map.on('mouseleave', 'grocerycluster', function() {
      if (msoaID) {
        map.setFeatureState(
          { source: 'msoa', id: msoaID},
          { hover: false }
        );
      }
      msoaID = null;
    });
	
    map.on('mousemove', 'fooddesert', function(e) {

      map.getCanvas().style.cursor = 'pointer';

      // Check that the feature exits
      if (e.features.length > 0) {
        if (msoaID) {
          map.setFeatureState(
            { source: 'msoa', id: msoaID },
            { hover: false }
          );
        }

        msoaID = e.features[0].id;

        map.setFeatureState(
          { source: 'msoa', id: msoaID },
          { hover: true }
        );
	}});

 
    ///////////////////////////////////////////////////////////////////////////

    // When the mouse leaves the msoa, return opacity to normal
    map.on('mouseleave', 'fooddesert', function() {
      if (msoaID) {
        map.setFeatureState(
          { source: 'msoa', id: msoaID},
          { hover: false }
        );
      }
      msoaID = null;
    });

      map.on('mousemove', 'commonarea', function(e) {

      map.getCanvas().style.cursor = 'pointer';

      // Check that the feature exits
      if (e.features.length > 0) {
        if (msoaID) {
          map.setFeatureState(
            { source: 'msoa', id: msoaID },
            { hover: false }
          );
        }

        msoaID = e.features[0].id;

        map.setFeatureState(
          { source: 'msoa', id: msoaID },
          { hover: true }
        );
	}});

    ///////////////////////////////////////////////////////////////////////////

    // When the mouse leaves the borough, return opacity to normal
    map.on('mouseleave', 'commonarea', function() {
      if (msoaID) {
        map.setFeatureState(
          { source: 'msoa', id: msoaID},
          { hover: false }
        );
      }
      msoaID = null;
    });
    ///////////////////////////////////////////////////////////////////////////

    // If cluster's switch is toggled on...
	    // If cluster's switch is toggled on...
    function getClustersColoured(){

      // One cluster///////////////////////////////////////////////////////////////////////////
      $('#myonoffswitchCluster1').click(function(){
        if($(this).is(':checked')){
          map.setLayoutProperty('grocerycluster', 'visibility', 'visible');
        }
        else{
          map.setLayoutProperty('grocerycluster', 'visibility', 'none');
        }
      })

      // One cluster///////////////////////////////////////////////////////////////////////////
      $('#myonoffswitchCluster2').click(function(){
        if($(this).is(':checked')){
          map.setLayoutProperty('fooddesert', 'visibility', 'visible');
	      
        }
        else{
          map.setLayoutProperty('fooddesert', 'visibility', 'none');

        }
	  })
	  
	  // One cluster///////////////////////////////////////////////////////////////////////////
      $('#myonoffswitchCluster3').click(function(){
        if($(this).is(':checked')){
          map.setLayoutProperty('commonarea', 'visibility', 'visible');
	      
        }
        else{
          map.setLayoutProperty('commonarea', 'visibility', 'none');

        }
	  })  
	  
	  
	  // One cluster///////////////////////////////////////////////////////////////////////////
	  $('#myonoffswitchCluster4').click(function(){
		  
		  
        if($(this).is(':checked')){
			var dataArray = [];
	       $.getJSON( "http://3.12.214.250:8890/data/grocery/Waitrose", function( data ) {
				$.each(data, function(k,v){				
				
				var lngLat = new mapboxgl.LngLat(v.long_wgs, v.lat_wgs)	
					
				dataArray.push(lngLat);	
						    					
				var content = "<b>Retailer: </b>"+v.retailer+"<br/> <br/><b>Store name:</b><br/> "+v.store_name+"<br/><b>Location:</b> "+ v.lat_wgs +", "+ v.long_wgs;
						    	
	            var popup = new mapboxgl.Popup()
		        .setHTML(content);
				const imagewaitrose = document.createElement('img')
                imagewaitrose.src = './img/icon.png'
				imagewaitrose.width = "12"
				imagewaitrose.height = "12"
				

	
	            var marker = new mapboxgl.Marker({
		        element:imagewaitrose,
		

		        })
		        .setLngLat(lngLat)
		        .setPopup(popup)
		        .addTo(map);	
				
				mapMarkerswaitrose.push(marker)
				
	        });	
	     });	
	        
	  
        }
	 else{
         mapMarkerswaitrose.forEach((marker) => marker.remove())
         mapMarkerswaitrose = []

        }
	})	
	
	// One cluster///////////////////////////////////////////////////////////////////////////
      $('#myonoffswitchCluster5').click(function(){
		 
        if($(this).is(':checked')){
			var dataArray = [];
	       $.getJSON( "http://3.12.214.250:8890/data/grocery/Tesco", function( data ) {
				$.each(data, function(k,v){				
				
				var lngLat = new mapboxgl.LngLat(v.long_wgs, v.lat_wgs)	
					
				dataArray.push(lngLat);	
						    					
				var content = "<b>Retailer: </b>"+v.retailer+"<br/> <br/><b>Store name:</b><br/> "+v.store_name+"<br/><b>Location:</b> "+ v.lat_wgs +", "+ v.long_wgs;
				
	            var popup = new mapboxgl.Popup()
		        .setHTML(content);
				const imagetesco = document.createElement('img')
                imagetesco.src = './img/blue_marker.png'
				imagetesco.width = "12"
				imagetesco.height = "12"

	
	            var marker = new mapboxgl.Marker({
				element:imagetesco,
	
		
		        })
		        .setLngLat(lngLat)
		        .setPopup(popup)
		        .addTo(map);	
				
				mapMarkerstesco.push(marker)
			
	        });	
	     });	
	        
	  
        }
	 else{
         mapMarkerstesco.forEach((marker) => marker.remove())
         mapMarkerstesco = []

        }
	})
	
	// One cluster///////////////////////////////////////////////////////////////////////////
      $('#myonoffswitchCluster7').click(function(){
		  	  
        if($(this).is(':checked')){
			var dataArray = [];
	       $.getJSON( "http://3.12.214.250:8890/data/grocery/Asda", function( data ) {
				$.each(data, function(k,v){				
				
				var lngLat = new mapboxgl.LngLat(v.long_wgs, v.lat_wgs)	
					
				dataArray.push(lngLat);	
						    					
				var content = "<b>Retailer: </b>"+v.retailer+"<br/> <br/><b>Store name:</b><br/> "+v.store_name+"<br/><b>Location:</b> "+ v.lat_wgs +", "+ v.long_wgs;
			
	            var popup = new mapboxgl.Popup()
		        .setHTML(content);
				
				const imageasda = document.createElement('img')
                imageasda.src = './img/green_marker.png'
				imageasda.width = "12"
				imageasda.height = "12"


	
	            var marker = new mapboxgl.Marker({
				element:imageasda,				

		        })
		        .setLngLat(lngLat)
		        .setPopup(popup)
		        .addTo(map);	
				
				mapMarkersasda.push(marker)
	
	        });	
	     });	
	        
	  
        }
	 else{
         mapMarkersasda.forEach((marker) => marker.remove())
         mapMarkersasda = []

        }
	})	
	
	// One cluster///////////////////////////////////////////////////////////////////////////
     $('#myonoffswitchCluster6').click(function(){
		  
		  
        if($(this).is(':checked')){
			var dataArray = [];
	       $.getJSON( "http://3.12.214.250:8890/data/grocery/Sainsburys", function( data ) {
				$.each(data, function(k,v){				
				
				var lngLat = new mapboxgl.LngLat(v.long_wgs, v.lat_wgs)	
					
				dataArray.push(lngLat);	
						    					
				var content = "<b>Retailer: </b>"+v.retailer+"<br/> <br/><b>Store name:</b><br/> "+v.store_name+"<br/><b>Location:</b> "+ v.lat_wgs +", "+ v.long_wgs;
						    	
	            var popup = new mapboxgl.Popup()
		        .setHTML(content);
				const imagesains = document.createElement('img')
                imagesains.src = './img/orange_marker.png'
				imagesains.width = "12"
				imagesains.height = "12"


	
	            var marker = new mapboxgl.Marker({
				element:imagesains,	
		
		        })
		        .setLngLat(lngLat)
		        .setPopup(popup)
		        .addTo(map);	
	
				mapMarkerssainsburys.push(marker)
				
			
	        });	
	     });	
	        
	  
        }
	 else{
         mapMarkerssainsburys.forEach((marker) => marker.remove())
         mapMarkerssainsburys = []

        }
	})	
		
		
	// One cluster///////////////////////////////////////////////////////////////////////////	
     $('#myonoffswitchCluster8').click(function(){
		  
		  
        if($(this).is(':checked')){
			var dataArray = [];
	       $.getJSON( "http://3.12.214.250:8890/data/grocery/Aldi", function( data ) {
				$.each(data, function(k,v){				
				
				var lngLat = new mapboxgl.LngLat(v.long_wgs, v.lat_wgs)	
					
				dataArray.push(lngLat);	
						    					
				var content = "<b>Retailer: </b>"+v.retailer+"<br/> <br/><b>Store name:</b><br/> "+v.store_name+"<br/><b>Location:</b> "+ v.lat_wgs +", "+ v.long_wgs;
				
	            var popup = new mapboxgl.Popup()
		        .setHTML(content);

				const imagealdi = document.createElement('img')
                imagealdi.src = './img/pink_marker.png'
				imagealdi.width = "12"
				imagealdi.height = "12"
	
	            var marker = new mapboxgl.Marker({
		        element: imagealdi,
		        })
		        .setLngLat(lngLat)
		        .setPopup(popup)
		        .addTo(map);	
	
				mapMarkersaldi.push(marker)
				
	        });	
	     });	
	        
	  
        }
	 else{
         mapMarkersaldi.forEach((marker) => marker.remove())
         mapMarkersaldi = []

        }
	})		
	
	// One cluster///////////////////////////////////////////////////////////////////////////	
     $('#myonoffswitchCluster9').click(function(){
		  
		  
        if($(this).is(':checked')){
			var dataArray = [];
	       $.getJSON( "http://3.12.214.250:8890/data/grocery/Lidl", function( data ) {
				$.each(data, function(k,v){				
				
				var lngLat = new mapboxgl.LngLat(v.long_wgs, v.lat_wgs)	
					
				dataArray.push(lngLat);	
						    					
				var content = "<b>Retailer: </b>"+v.retailer+"<br/> <br/><b>Store name:</b><br/> "+v.store_name+"<br/><b>Location:</b> "+ v.lat_wgs +", "+ v.long_wgs;
						    	
	            var popup = new mapboxgl.Popup()
		        .setHTML(content);

				const imagelidl = document.createElement('img')
                imagelidl.src = './img/yellow_marker.png'
				imagelidl.width = "12"
				imagelidl.height = "12"
	
	            var marker = new mapboxgl.Marker({
				element: imagelidl,
		        })
		        .setLngLat(lngLat)
		        .setPopup(popup)
		        .addTo(map);	
	
				mapMarkerslidl.push(marker)
				
	        });	
	     });	

        }
	 else{
         mapMarkerslidl.forEach((marker) => marker.remove())
         mapMarkerslidl = []

        }
	})	
	
	}
    
	// Click events///////////////////////////////////////////////////////////////////////////
	getClustersColoured();
	map.on('click', 'grocerycluster', function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
			  .setHTML("<b>MSOA name:</b> "+e.features[0].properties["MSOA_2011_London_gen_MHW_Pro4.MSOA11NM"]+"<br/><b>Store count:</b> "+ e.features[0].properties["group.csv.Join_Count"])
              .addTo(map);
    });
	map.on('click', 'fooddesert', function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
			  .setHTML("<b>MSOA name:</b> "+e.features[0].properties["MSOA_2011_London_gen_MHW_Pro4.MSOA11NM"]+"<br/><b>Store count:</b> "+ e.features[0].properties["group.csv.Join_Count"])
              .addTo(map);
    });
 	map.on('click', 'commonarea', function (e) {
          new mapboxgl.Popup()
              .setLngLat(e.lngLat)
			  .setHTML("<b>MSOA name:</b> "+e.features[0].properties["MSOA_2011_London_gen_MHW_Pro4.MSOA11NM"]+"<br/><b>Store count:</b> "+ e.features[0].properties["group.csv.Join_Count"])
              .addTo(map);
    });
 
			

 // end of on load
