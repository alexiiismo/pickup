    var map = new AMap.Map("container", {
        center: [113.921071, 22.532495],
		lang: "en",
        zoom: 13
    });
	
	AMap.plugin([
		'AMap.ToolBar',
		'AMap.Scale',
		'AMap.OverView',
		'AMap.MapType',
	], function(){
		map.addControl(new AMap.Scale());
		})
		
	
	var trafficLayer = new AMap.TileLayer.Traffic({
        zIndex: 10
    });

    trafficLayer.setMap(map);
	trafficLayer.hide()

    var notVisible = true;
    function toggle() {
        if (notVisible) {
            trafficLayer.show();
            notVisible = false;
        } else {
            trafficLayer.hide();
            notVisible = true;
        }
    }

	
    //<!-- Route Function -->
	function setrouteopt(a) {
		var drivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME, // policy ref: https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
		}
		// Drving Route API
		var driving = new AMap.Driving(drivingOption)		 
		// Route
		driving.search(new AMap.LngLat(a[0],a[1]), new AMap.LngLat(a[12],a[13]), {
			waypoints:[new AMap.LngLat(a[2],a[3]),new AMap.LngLat(a[4],a[5]),new AMap.LngLat(a[6],a[7]),new AMap.LngLat(a[8],a[9]),new AMap.LngLat(a[10],a[11])]
		}, function(status, result) {
			// result https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
			if (status === 'complete') {
				if (result.routes && result.routes.length) {
					//draw route
					drawRoute(result.routes[0])
					log.success('Finished!')
				}
			} else {
				log.error('Ooops：' + result)
			}
		});

		function drawRoute (route) {
			var path = parseRouteToPath(route)

			var startMarker = new AMap.Marker({
				position: path[0],
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png',
				map: map
			})

			var endMarker = new AMap.Marker({
				position: path[path.length - 3],
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png',
				map: map
			})

			var routeLine = new AMap.Polyline({
				path: path,
				isOutline: true,
				outlineColor: '#ffeeee',
				borderWeight: 2,
				strokeWeight: 5,
				strokeColor: '	#AB0A6F',
				lineJoin: 'round'
			})

			routeLine.setMap(map)

			//Fit View
			map.setFitView([ startMarker, endMarker, routeLine ])
		}

		// DrivingRoute object，AMap.Polyline - path parameters
		// Documentation https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
		function parseRouteToPath(route) {
			var path = []

			for (var i = 0, l = route.steps.length; i < l; i++) {
				var step = route.steps[i]

				for (var j = 0, n = step.path.length; j < n; j++) {
				  path.push(step.path[j])
				}
			}

			return path
		}
		
		var marker0 = new AMap.Marker({
			position: new AMap.LngLat(a[0],[1]),
			title: 'Dep',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(a[2],a[3]),
			title: 'Way1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(a[4],a[5]),
			title: 'Way2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(a[6],a[7]),
			title: 'Way3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});	
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(a[8],a[9]),
			title: 'Way4',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker5 = new AMap.Marker({
			position: new AMap.LngLat(a[10],a[11]),
			title: 'Way5',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
			});
		
		var marker6 = new AMap.Marker({
			position: new AMap.LngLat(a[12],a[13]),
			title: 'Des',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});
		
		var markerList = [marker1, marker2, marker3, marker4, marker5, marker6];
		map.add(markerList);
		
	}

	
	function setrouteori(a) {
		var drivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME, // policy ref: https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
		}
		// Drving Route API
		var driving = new AMap.Driving(drivingOption)		 
		// Route
		driving.search(new AMap.LngLat(a[0],a[1]), new AMap.LngLat(a[12],a[13]), {
			waypoints:[new AMap.LngLat(a[2],a[3]),new AMap.LngLat(a[4],a[5]),new AMap.LngLat(a[6],a[7]),new AMap.LngLat(a[8],a[9]),new AMap.LngLat(a[10],a[11])]
		}, function(status, result) {
			// result https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
			if (status === 'complete') {
				if (result.routes && result.routes.length) {
					//draw route
					drawRoute(result.routes[0])
					log.success('Finished!')
				}
			} else {
				log.error('Ooops：' + result)
			}
		});

		function drawRoute (route) {
			var path = parseRouteToPath(route)

			var startMarker = new AMap.Marker({
				position: path[0],
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png',
				map: map
			})

			var endMarker = new AMap.Marker({
				position: path[path.length - 3],
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png',
				map: map
			})

			var routeLine = new AMap.Polyline({
				path: path,
				isOutline: true,
				outlineColor: '#ffeeee',
				borderWeight: 2,
				strokeWeight: 5,
				strokeColor: '	#3183FF',
				lineJoin: 'round'
			})

			routeLine.setMap(map)

			//Fit View
			map.setFitView([ startMarker, endMarker, routeLine ])
		}

		// DrivingRoute object，AMap.Polyline - path parameters
		// Documentation https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
		function parseRouteToPath(route) {
			var path = []

			for (var i = 0, l = route.steps.length; i < l; i++) {
				var step = route.steps[i]

				for (var j = 0, n = step.path.length; j < n; j++) {
				  path.push(step.path[j])
				}
			}

			return path
		}
		
		var marker0 = new AMap.Marker({
			position: new AMap.LngLat(a[0],[1]),
			title: 'Dep',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(a[2],a[3]),
			title: 'Way1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(a[4],a[5]),
			title: 'Way2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(a[6],a[7]),
			title: 'Way3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});	
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(a[8],a[9]),
			title: 'Way4',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker5 = new AMap.Marker({
			position: new AMap.LngLat(a[10],a[11]),
			title: 'Way5',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
			});
		
		var marker6 = new AMap.Marker({
			position: new AMap.LngLat(a[12],a[13]),
			title: 'Des',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});
		
		var markerList = [marker1, marker2, marker3, marker4, marker5, marker6];
		map.add(markerList);
		
	}

	function setstdori(b) {
		document.getElementById('stable').rows[1].childNodes[2].innerText = b[0];
		document.getElementById('stable').rows[1].childNodes[3].innerText = b[1];
		document.getElementById('stable').rows[1].childNodes[4].innerText = b[2];
		document.getElementById('stable').rows[1].childNodes[5].innerText = b[3];
		document.getElementById('stable').rows[1].childNodes[6].innerText = b[4];
		document.getElementById('stable').rows[1].childNodes[7].innerText = b[5];
	}               
	
	function setstdopt(b) {
		document.getElementById('stable').rows[2].childNodes[2].innerText = b[0];
		document.getElementById('stable').rows[2].childNodes[3].innerText = b[1];
		document.getElementById('stable').rows[2].childNodes[4].innerText = b[2];
		document.getElementById('stable').rows[2].childNodes[5].innerText = b[3];
		document.getElementById('stable').rows[2].childNodes[6].innerText = b[4];
		document.getElementById('stable').rows[2].childNodes[7].innerText = b[5];
	}  
	
	
	document.querySelector("#clearmap").onclick = function() {
		map.clearMap();
    }
		
    document.querySelector("#origin").onclick = function() {
		var marker0 = new AMap.Marker({
			position: new AMap.LngLat(113.899168,22.563713),
			title: '#1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(113.907229,22.527346),
			title: '#2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(113.913696,22.540707),
			title: '#3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(113.905948,22.559647), 
			title: '#4',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});	
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(113.918235,22.491914), 
			title: '#5',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker5 = new AMap.Marker({
			position: new AMap.LngLat(113.923016,22.520114), 
			title: '#6',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
			});
		
		var marker6 = new AMap.Marker({
			position: new AMap.LngLat(113.888248,22.554537), 
			title: '#7',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker7 = new AMap.Marker({
			position: new AMap.LngLat(113.934395,22.540373), 
			title: '#8',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker8 = new AMap.Marker({
			position: new AMap.LngLat(113.914631,22.513432), 
			title: '#9',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});
		
		var marker9 = new AMap.Marker({
			position: new AMap.LngLat(113.943561,22.548272), 
			title: '#10',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker10 = new AMap.Marker({
			position: new AMap.LngLat(113.972654,22.59163),
			title: '#11',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});
		
		var marker11 = new AMap.Marker({
			position: new AMap.LngLat(113.933484,22.526272),
			title: '#12',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker12 = new AMap.Marker({
			position: new AMap.LngLat(113.864171,22.575448),
			title: '#13',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker13 = new AMap.Marker({
			position: new AMap.LngLat(113.941285,22.573192), 
			title: '#14',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});	
		
		var marker14 = new AMap.Marker({
			position: new AMap.LngLat(113.938384,22.516783), 
			title: '#15',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker15 = new AMap.Marker({
			position: new AMap.LngLat(113.924614,22.530921), 
			title: '#16',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
			});
		
		var marker16 = new AMap.Marker({
			position: new AMap.LngLat(113.936926,22.497938), 
			title: '#17',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker17 = new AMap.Marker({
			position: new AMap.LngLat(113.921913,22.53431), 
			title: '#18',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		var marker18 = new AMap.Marker({
			position: new AMap.LngLat(113.90202,22.517789), 
			title: '#19',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});
		
		var marker19 = new AMap.Marker({
			position: new AMap.LngLat(113.948581,22.534589), 
			title: '#20',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/pointer.png'
		});

		
		var markerList = [marker0,marker1,marker2,marker3,marker4,marker5,marker6,marker7,marker8,marker9,
		marker10,marker11,marker12,marker13,marker14,marker15,marker16,marker17,marker18,marker19];
		map.add(markerList);
    }
	
	document.querySelector("#setchina").onclick = function(){
		map.setZoomAndCenter(4,[105.921071, 32.532495])
	}
	
    document.querySelector("#setshenzhen").onclick = function() {
		map.setZoomAndCenter(10,[114.025973657,22.5460535462])
    }

    document.querySelector("#setnanshan").onclick = function() {
		map.setZoomAndCenter(13,[113.921071, 22.532495])
    }
		
	document.querySelector("#gpsposition").onclick = function() {
		var marker0 = new AMap.Marker({
			position: new AMap.LngLat(113.943061,22.547572),
			title: 'GPS',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/orange_dot_24px_553003_easyicon.net.ico'
		});
		map.add(marker0);
		map.setZoomAndCenter(18,[113.943061,22.547772])
    }
	
	document.querySelector("#orginlocation").onclick = function() {
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(113.942099,22.548410), 
			title: 'Original',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/red_dot_24px_553047_easyicon.net.ico'
		});
		map.add(marker4);
    }	

	document.querySelector("#alternativep").onclick = function() {
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(113.945278,22.551923),
			title: 'A2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/blue_dot_24px_552649_easyicon.net.ico'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(113.938707,22.546275),
			title: 'A1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/blue_dot_24px_552649_easyicon.net.ico'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(113.939361,22.549669), 
			title: 'A3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/blue_dot_24px_552649_easyicon.net.ico'
		});	

		var markerList = [marker1,marker2,marker3];
		map.add(markerList);
		map.setZoomAndCenter(16,[113.942099,22.548410])
    }	
	
	document.querySelector("#processpdp").onclick = function() {
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(113.921913,22.53431), 
			title: 'Original',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/red_dot_24px_553047_easyicon.net.ico'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(113.919579,22.535906),
			title: 'B1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/blue_dot_24px_552649_easyicon.net.ico'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(113.921591,22.535562),
			title: 'B2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/blue_dot_24px_552649_easyicon.net.ico'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(113.924482,22.535698), 
			title: 'B3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/blue_dot_24px_552649_easyicon.net.ico'
		});	

		var markerList = [marker4,marker1,marker2,marker3];
		map.add(markerList);
		map.setZoomAndCenter(14,[113.933595,22.54136])
    }	
	
	document.querySelector("#proorirout").onclick = function() {	
		var drivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME, // policy ref: https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
		}
		// Drving Route API
		var driving = new AMap.Driving(drivingOption)		 
		// Route
		driving.search(new AMap.LngLat(113.942099,22.548410), new AMap.LngLat(113.921913,22.53431), {
		}, function(status, result) {
			// result https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
			if (status === 'complete') {
				if (result.routes && result.routes.length) {
					//draw route
					drawRoute(result.routes[0])
					log.success('Finished!')
				}
			} else {
				log.error('Ooops：' + result)
			}
		});

		function drawRoute (route) {
			var path = parseRouteToPath(route)

			var startMarker = new AMap.Marker({
				position: path[0],
				map: map,
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/dot_16px_1157747_easyicon.ico'
			})

			var endMarker = new AMap.Marker({
				position: path[path.length - 3],
				map: map,
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/dot_16px_1157747_easyicon.ico'
			})

			var routeLine = new AMap.Polyline({
				path: path,
				isOutline: true,
				outlineColor: '#ffeeee',
				borderWeight: 2,
				strokeWeight: 5,
				strokeColor: '	#F00',
				lineJoin: 'round'
			})

			routeLine.setMap(map)

			//Fit View
			map.setFitView([ startMarker, endMarker, routeLine ])
		}

		// DrivingRoute object，AMap.Polyline - path parameters
		// Documentation https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
		function parseRouteToPath(route) {
			var path = []

			for (var i = 0, l = route.steps.length; i < l; i++) {
				var step = route.steps[i]

				for (var j = 0, n = step.path.length; j < n; j++) {
				  path.push(step.path[j])
				}
			}

			return path
		}
	}

	document.querySelector("#prooriaba").onclick = function() {	
		var drivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME, // policy ref: https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
		}
		// Drving Route API
		var driving = new AMap.Driving(drivingOption)		 
		// Route
		driving.search(new AMap.LngLat(113.938707,22.546275), new AMap.LngLat(113.919579,22.535906), {
		}, function(status, result) {
			// result https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
			if (status === 'complete') {
				if (result.routes && result.routes.length) {
					//draw route
					drawRoute(result.routes[0])
					log.success('Finished!')
				}
			} else {
				log.error('Ooops：' + result)
			}
		});

		function drawRoute (route) {
			var path = parseRouteToPath(route)

			var startMarker = new AMap.Marker({
				position: path[0],
				map: map,
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/dot_16px_1157747_easyicon.ico'
			})

			var endMarker = new AMap.Marker({
				position: path[path.length - 3],
				map: map,
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/dot_16px_1157747_easyicon.ico'
			})

			var routeLine = new AMap.Polyline({
				path: path,
				isOutline: true,
				outlineColor: '#ffeeee',
				borderWeight: 2,
				strokeWeight: 5,
				strokeColor: '	#3183FF',
				lineJoin: 'round'
			})

			routeLine.setMap(map)

			//Fit View
			map.setFitView([ startMarker, endMarker, routeLine ])
		}

		// DrivingRoute object，AMap.Polyline - path parameters
		// Documentation https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
		function parseRouteToPath(route) {
			var path = []

			for (var i = 0, l = route.steps.length; i < l; i++) {
				var step = route.steps[i]

				for (var j = 0, n = step.path.length; j < n; j++) {
				  path.push(step.path[j])
				}
			}

			return path
		}
	}
	
	document.querySelector("#prooriabb").onclick = function() {	
		var drivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME, // policy ref: https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
		}
		// Drving Route API
		var driving = new AMap.Driving(drivingOption)		 
		// Route
		driving.search(new AMap.LngLat(113.938707,22.546275), new AMap.LngLat(113.921591,22.535562), {
		}, function(status, result) {
			// result https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
			if (status === 'complete') {
				if (result.routes && result.routes.length) {
					//draw route
					drawRoute(result.routes[0])
					log.success('Finished!')
				}
			} else {
				log.error('Ooops：' + result)
			}
		});

		function drawRoute (route) {
			var path = parseRouteToPath(route)

			var startMarker = new AMap.Marker({
				position: path[0],
				map: map,
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/dot_16px_1157747_easyicon.ico'
			})

			var endMarker = new AMap.Marker({
				position: path[path.length - 3],
				map: map,
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/PDP/image/dot_16px_1157747_easyicon.ico'
			})

			var routeLine = new AMap.Polyline({
				path: path,
				isOutline: true,
				outlineColor: '#ffeeee',
				borderWeight: 2,
				strokeWeight: 5,
				strokeColor: '	#3183FF',
				lineJoin: 'round'
			})

			routeLine.setMap(map)

			//Fit View
			map.setFitView([ startMarker, endMarker, routeLine ])
		}

		// DrivingRoute object，AMap.Polyline - path parameters
		// Documentation https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
		function parseRouteToPath(route) {
			var path = []

			for (var i = 0, l = route.steps.length; i < l; i++) {
				var step = route.steps[i]

				for (var j = 0, n = step.path.length; j < n; j++) {
				  path.push(step.path[j])
				}
			}

			return path
		}
	}
	
	document.querySelector("#proclearmap").onclick = function() {
		map.clearMap();
    }
		
	document.querySelector("#prolist").onclick = function() {
		var marker0 = new AMap.Marker({
			position: new AMap.LngLat(113.922764,22.520902),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Original',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(113.934395,22.540373),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(113.941285,22.573192),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(113.914631,22.513432),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});	
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(113.923016,22.520114),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker5 = new AMap.Marker({
			position: new AMap.LngLat(113.905948,22.559647),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
			});
		
		var marker6 = new AMap.Marker({
			position: new AMap.LngLat(113.864171,22.575448),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});
		
		var markerList = [marker0, marker1, marker2, marker3, marker4, marker5, marker6];
		map.add(markerList);
    }
	
	document.querySelector("#proorder").onclick = function() {
		
		var marker0 = new AMap.Marker({
			position: new AMap.LngLat(113.922764,22.520902),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Original',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(113.934395,22.540373),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter1',
			icon: 'image/icons8-1-50.png'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(113.941285,22.573192),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter2',
			icon: 'image/icons8-2-50.png'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(113.914631,22.513432),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter3',
			icon: 'image/icons8-3-50.png'
		});	
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(113.923016,22.520114),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'image/icons8-4-50.png'
		});

		var marker5 = new AMap.Marker({
			position: new AMap.LngLat(113.905948,22.559647),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'image/icons8-5-50.png'
			});
		
		var marker6 = new AMap.Marker({
			position: new AMap.LngLat(113.864171,22.575448),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'image/icons8-6-50.png'
		});
		
		var markerList = [marker0, marker1, marker2, marker3, marker4, marker5, marker6];
		map.clearMap();
		map.add(markerList);
    }
		
	document.querySelector("#proori").onclick = function() {
		var drivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
		}

		// 构造路线导航类
		var driving = new AMap.Driving(drivingOption)

		// 根据起终点经纬度规划驾车导航路线
		driving.search(new AMap.LngLat(113.922764,22.520902), new AMap.LngLat(113.864171,22.575448), {
			waypoints:[new AMap.LngLat(113.934395,22.540373),new AMap.LngLat(113.941285,22.573192),new AMap.LngLat(113.914631,22.513432),new AMap.LngLat(113.923016,22.520114),new AMap.LngLat(113.905948,22.559647)]

			}, function(status, result) {
			// result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
			if (status === 'complete') {
				if (result.routes && result.routes.length) {
					// 绘制第一条路线，也可以按需求绘制其它几条路线
					drawRoute(result.routes[0])
					log.success('Finished!')
				}
			} else {
				log.error('Ooops：' + result)
			}
		});

		function drawRoute (route) {
			var path = parseRouteToPath(route)

			var startMarker = new AMap.Marker({
				position: path[0],
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png',
				map: map
			})

	        var endMarker = new AMap.Marker({
	            position: path[path.length - 3],
	            icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png',
	            map: map
			})

			var routeLine = new AMap.Polyline({
				path: path,
				isOutline: true,
				outlineColor: '#ffeeee',
				borderWeight: 2,
				strokeWeight: 5,
				strokeColor: '#3183FF',
				lineJoin: 'round'
			})

			routeLine.setMap(map)

			map.setFitView([ startMarker, endMarker, routeLine ])
		}

		// 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
		// DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
		function parseRouteToPath(route) {
			var path = []

			for (var i = 0, l = route.steps.length; i < l; i++) {
				var step = route.steps[i]

				for (var j = 0, n = step.path.length; j < n; j++) {
				  path.push(step.path[j])
				}
			}

			return path
		}
		
		// PDP
		var marker10 = new AMap.Marker({
			position: new AMap.LngLat(113.943561,22.548272),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Original',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});
		
		var marker11 = new AMap.Marker({
			position: new AMap.LngLat(113.932909,22.544451),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker12 = new AMap.Marker({
			position: new AMap.LngLat(113.939056,22.572479),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker13 = new AMap.Marker({
			position: new AMap.LngLat(113.915865,22.512352),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});	
		
		var marker14 = new AMap.Marker({
			position: new AMap.LngLat(113.92212,22.518132),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker15 = new AMap.Marker({
			position: new AMap.LngLat(113.903942,22.55973),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
			});
		
		var marker16 = new AMap.Marker({
			position: new AMap.LngLat(113.864595,22.574063),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});
		
		
		//ORIGINAL
		var marker0 = new AMap.Marker({
			position: new AMap.LngLat(113.922764,22.520902),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Original',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(113.934395,22.540373),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(113.941285,22.573192),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(113.914631,22.513432),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});	
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(113.923016,22.520114),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker5 = new AMap.Marker({
			position: new AMap.LngLat(113.905948,22.559647),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
			});
		
		var marker6 = new AMap.Marker({
			position: new AMap.LngLat(113.864171,22.575448),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});
		
		
		var markerList = [marker1, marker2, marker3, marker4, marker5, marker6];
		// 将创建的点标记添加到已有的地图实例：
		map.add(markerList);
			
    }
		
	document.querySelector("#proopt").onclick = function() {
		var drivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
		}

		// 构造路线导航类
		var driving = new AMap.Driving(drivingOption)

		// 根据起终点经纬度规划驾车导航路线
		driving.search(new AMap.LngLat(113.922764,22.520902), new AMap.LngLat(113.864595,22.574063), {
			waypoints:[new AMap.LngLat(113.932909,22.544451),new AMap.LngLat(113.939056,22.572479),new AMap.LngLat(113.915865,22.512352),new AMap.LngLat(113.92212,22.518132),new AMap.LngLat(113.903942,22.55973)]
		}, function(status, result) {
			// result即是对应的驾车导航信息，相关数据结构文档请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
			if (status === 'complete') {
				if (result.routes && result.routes.length) {
					// 绘制第一条路线，也可以按需求绘制其它几条路线
					drawRoute(result.routes[0])
					log.success('Finished!')
				}
			} else {
				log.error('Ooops：' + result)
			}
		});

		function drawRoute (route) {
			var path = parseRouteToPath(route)

			var startMarker = new AMap.Marker({
				position: path[0],
				icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png',
				map: map
			})

			var endMarker = new AMap.Marker({
	              position: path[path.length - 3],
	              icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png',
	              map: map
	          })

			var routeLine = new AMap.Polyline({
				path: path,
				isOutline: true,
				outlineColor: '#ffeeee',
				borderWeight: 2,
				strokeWeight: 5,
				strokeColor: '	#AB0A6F',
				lineJoin: 'round'
			})

			routeLine.setMap(map)

			map.setFitView([ startMarker, endMarker, routeLine ])
		}

		// 解析DrivingRoute对象，构造成AMap.Polyline的path参数需要的格式
		// DrivingResult对象结构参考文档 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DriveRoute
		function parseRouteToPath(route) {
			var path = []

			for (var i = 0, l = route.steps.length; i < l; i++) {
				var step = route.steps[i]

				for (var j = 0, n = step.path.length; j < n; j++) {
				  path.push(step.path[j])
				}
			}

			return path
		}
		
		
		// PDP
		var marker10 = new AMap.Marker({
			position: new AMap.LngLat(113.943561,22.548272),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Original',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});
		
		var marker11 = new AMap.Marker({
			position: new AMap.LngLat(113.932909,22.544451),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker12 = new AMap.Marker({
			position: new AMap.LngLat(113.939056,22.572479),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker13 = new AMap.Marker({
			position: new AMap.LngLat(113.915865,22.512352),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});	
		
		var marker14 = new AMap.Marker({
			position: new AMap.LngLat(113.92212,22.518132),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker15 = new AMap.Marker({
			position: new AMap.LngLat(113.903942,22.55973),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
			});
		
		var marker16 = new AMap.Marker({
			position: new AMap.LngLat(113.864595,22.574063),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});
		
		
		//ORIGINAL
		var marker0 = new AMap.Marker({
			position: new AMap.LngLat(113.922764,22.520902),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Original',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(113.934395,22.540373),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(113.941285,22.573192),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(113.914631,22.513432),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});	
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(113.923016,22.520114),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});

		var marker5 = new AMap.Marker({
			position: new AMap.LngLat(113.905948,22.559647),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
			});
		
		var marker6 = new AMap.Marker({
			position: new AMap.LngLat(113.864171,22.575448),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
			title: 'Alter01',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/passanger_taxi_32px_40411_easyicon.net.png'
		});
		
		var markerList = [marker11, marker12, marker13, marker14, marker15, marker16];
		map.add(markerList);

    }
	
    document.querySelector('#ori1').onclick = function() {
        var ori1 = [113.892275, 22.559044, 113.972654, 22.59163, 113.943561, 22.548272, 113.934395, 22.540373, 113.907229, 22.527346, 113.905948, 22.559647, 113.888248, 22.554537]
        setrouteori(ori1)
        var oriR1 = ['41394', '6903', '43', '43', '80', '47']
        setstdori(oriR1)
    }
    document.querySelector('#opt1').onclick = function() {
        var opt1 = [113.892275, 22.559044, 113.970742, 22.589347, 113.945278, 22.551923, 113.935725, 22.542756, 113.909707, 22.528476, 113.903942, 22.559731, 113.890222, 22.551852]
        setrouteopt(opt1)
        var optR1 = ['41499', '5932', '40', '27', '56', '45']
        setstdopt(optR1)
    }
    document.querySelector('#ori2').onclick = function() {
        var ori2 = [113.922764, 22.520902, 113.934395, 22.540373, 113.941285, 22.573192, 113.914631, 22.513432, 113.923016, 22.520114, 113.905948, 22.559647, 113.864171, 22.575448]
        setrouteori(ori2)
        var oriR2 = ['34102', '5400', '33', '46', '68', '40']
        setstdori(oriR2)
    }
    document.querySelector('#opt2').onclick = function() {
        var opt2 = [113.922764, 22.520902, 113.932909, 22.544451, 113.939056, 22.572479, 113.915865, 22.512352, 113.92212, 22.518132, 113.903942, 22.559731, 113.864595, 22.574063]
        setrouteopt(opt2)
        var optR2 = ['28692', '3282', '22', '17', '40', '40']
        setstdopt(optR2)
    }
    document.querySelector('#ori3').onclick = function() {
        var ori3 = [113.924182, 22.50632, 113.941285, 22.573192, 113.972654, 22.59163, 113.913696, 22.540707, 113.905948, 22.559647, 113.864171, 22.575448, 113.914631, 22.513432]
        setrouteori(ori3)
        var oriR3 = ['49320', '5615', '33', '38', '74', '51']
        setstdori(oriR3)
    }
    document.querySelector('#opt3').onclick = function() {
        var opt3 = [113.924182, 22.50632, 113.939056, 22.572479, 113.970742, 22.589347, 113.92038, 22.540327, 113.903942, 22.559731, 113.864595, 22.574063, 113.913301, 22.51198]
        setrouteopt(opt3)
        var optR3 = ['47795', '5204', '45', '20', '47', '40']
        setstdopt(optR3)
    }
    document.querySelector('#ori4').onclick = function() {
        var ori4 = [113.920117, 22.540565, 113.913696, 22.540707, 113.905948, 22.559647, 113.864171, 22.575448, 113.888248, 22.554537, 113.943561, 22.548272, 113.923016, 22.520114]
        setrouteori(ori4)
        var oriR4 = ['30308', '6251', '25', '35', '54', '24']
        setstdori(oriR4)
    }
    document.querySelector('#opt4').onclick = function() {
        var opt4 = [113.920117, 22.540565, 113.915059, 22.536644, 113.903942, 22.559731, 113.864595, 22.574063, 113.891472, 22.557965, 113.939361, 22.549669, 113.927018, 22.519827]
        setrouteopt(opt4)
        var optR4 = ['28994', '5620', '24', '14', '40', '31']
        setstdopt(optR4)
    }
    document.querySelector('#ori5').onclick = function() {
        var ori5 = [113.948625, 22.540236, 113.934395, 22.540373, 113.943561, 22.548272, 113.941285, 22.573192, 113.905948, 22.559647, 113.913696, 22.540707, 113.923016, 22.520114]
        setrouteori(ori5)
        var oriR5 = ['23149', '5950', '23', '44', '67', '34']
        setstdori(oriR5)
    }
    document.querySelector('#opt5').onclick = function() {
        var opt5 = [113.948625, 22.540236, 113.935725, 22.542756, 113.939361, 22.549669, 113.939056, 22.572479, 113.906613, 22.557076, 113.915059, 22.536644, 113.92212, 22.518132]
        setrouteopt(opt5)
        var optR5 = ['22276', '4791', '19', '13', '39', '36']
        setstdopt(optR5)
    }
    document.querySelector('#ori6').onclick = function() {
        var ori6 = [113.892275, 22.559044, 113.888248, 22.554537, 113.899168, 22.563713, 113.914631, 22.513432, 113.918235, 22.491914, 113.923016, 22.520114, 113.864171, 22.575448]
        setrouteori(ori6)
        var oriR6 = ['29734', '4669', '39', '39', '60', '40']
        setstdori(oriR6)
    }
    document.querySelector('#opt6').onclick = function() {
        var opt6 = [113.892275, 22.559044, 113.890222, 22.551852, 113.901276, 22.566557, 113.913301, 22.51198, 113.920514, 22.496796, 113.92212, 22.518132, 113.864595, 22.574063]
        setrouteopt(opt6)
        var optR6 = ['31000', '4615', '47', '22', '43', '42']
        setstdopt(optR6)
    }
    document.querySelector('#ori7').onclick = function() {
        var ori7 = [113.924182, 22.50632, 113.914631, 22.513432, 113.948581, 22.534589, 113.972654, 22.59163, 113.864171, 22.575448, 113.90202, 22.517789, 113.918235, 22.491914]
        setrouteori(ori7)
        var oriR7 = ['47788', '8653', '77', '40', '64', '39']
        setstdori(oriR7)
    }
    document.querySelector('#opt7').onclick = function() {
        var opt7 = [113.924182, 22.50632, 113.915865, 22.512352, 113.945539, 22.533836, 113.970742, 22.589347, 113.864595, 22.574063, 113.904005, 22.517497, 113.920514, 22.496796]
        setrouteopt(opt7)
        var optR7 = ['49262', '7693', '66', '33', '56', '43']
        setstdopt(optR7)
    }
    document.querySelector('#ori8').onclick = function() {
        var ori8 = [113.934042, 22.49511, 113.936926, 22.497938, 113.972654, 22.59163, 113.941285, 22.573192, 113.934395, 22.540373, 113.923016, 22.520114, 113.914631, 22.513432]
        setrouteori(ori8)
        var oriR8 = ['32036', '4179', '38', '40', '66', '45']
        setstdori(oriR8)
    }
    document.querySelector('#opt8').onclick = function() {
        var opt8 = [113.934042, 22.49511, 113.937693, 22.500099, 113.970742, 22.589347, 113.944099, 22.572344, 113.935725, 22.542756, 113.92212, 22.518132, 113.915865, 22.512352]
        setrouteopt(opt8)
        var optR8 = ['32926', '4020', '41', '22', '44', '36']
        setstdopt(optR8)
    }
    document.querySelector('#ori9').onclick = function() {
        var ori9 = [113.930553, 22.58178, 113.941285, 22.573192, 113.888248, 22.554537, 113.921913, 22.53431, 113.924614, 22.530921, 113.933484, 22.526272, 113.936926, 22.497938]
        setrouteori(ori9)
        var oriR9 = ['24011', '3201', '25', '38', '62', '38']
        setstdori(oriR9)
    }
    document.querySelector('#opt9').onclick = function() {
        var opt9 = [113.930553, 22.58178, 113.944099, 22.572344, 113.891472, 22.557965, 113.921591, 22.535562, 113.924319, 22.527468, 113.93247, 22.525471, 113.937693, 22.500099]
        setrouteopt(opt9)
        var optR9 = ['25037', '2834', '27', '19', '39', '38']
        setstdopt(optR9)
    }
    document.querySelector('#ori10').onclick = function() {
        var ori10 = [113.893932, 22.567904, 113.905948, 22.559647, 113.899168, 22.563713, 113.943561, 22.548272, 113.933484, 22.526272, 113.923016, 22.520114, 113.921913, 22.53431]
        setrouteori(ori10)
        var oriR10 = ['20866', '3134', '26', '38', '57', '32']
        setstdori(oriR10)
    }
    document.querySelector('#opt10').onclick = function() {
        var opt10 = [113.893932, 22.567904, 113.903942, 22.559731, 113.899404, 22.562054, 113.939361, 22.549669, 113.93247, 22.525471, 113.92212, 22.518132, 113.921591, 22.535562]
        setrouteopt(opt10)
        var optR10 = ['19485', '2296', '30', '15', '34', '34']
        setstdopt(optR10)
    }
    document.querySelector('#ori11').onclick = function() {
        var ori11 = [113.957935, 22.580678, 113.972654, 22.59163, 113.90202, 22.517789, 113.914631, 22.513432, 113.923016, 22.520114, 113.924614, 22.530921, 113.934395, 22.540373]
        setrouteori(ori11)
        var oriR11 = ['27187', '6502', '42', '34', '53', '32']
        setstdori(oriR11)
    }
    document.querySelector('#opt11').onclick = function() {
        var opt11 = [113.957935, 22.580678, 113.964262, 22.589391, 113.902607, 22.518654, 113.913301, 22.51198, 113.92212, 22.518132, 113.924319, 22.527468, 113.935725, 22.542756]
        setrouteopt(opt11)
        var optR11 = ['25444', '6496', '44', '23', '41', '25']
        setstdopt(optR11)
    }
    document.querySelector('#ori12').onclick = function() {
        var ori12 = [113.892275, 22.559044, 113.888248, 22.554537, 113.913696, 22.540707, 113.921913, 22.53431, 113.924614, 22.530921, 113.972654, 22.59163, 113.864171, 22.575448]
        setrouteori(ori12)
        var oriR12 = ['35116', '7961', '36', '25', '49', '25']
        setstdori(oriR12)
    }
    document.querySelector('#opt12').onclick = function() {
        var opt12 = [113.892275, 22.559044, 113.890222, 22.551852, 113.915059, 22.536644, 113.921591, 22.535562, 113.924319, 22.527468, 113.970742, 22.589347, 113.864595, 22.574063]
        setrouteopt(opt12)
        var optR12 = ['39787', '8531', '44', '26', '51', '32']
        setstdopt(optR12)
    }
    document.querySelector('#ori13').onclick = function() {
        var ori13 = [113.930553, 22.58178, 113.941285, 22.573192, 113.90202, 22.517789, 113.864171, 22.575448, 113.888248, 22.554537, 113.921913, 22.53431, 113.938384, 22.516783]
        setrouteori(ori13)
        var oriR13 = ['34520', '7504', '38', '37', '61', '40']
        setstdori(oriR13)
    }
    document.querySelector('#opt13').onclick = function() {
        var opt13 = [113.930553, 22.58178, 113.939056, 22.572479, 113.902607, 22.518654, 113.864595, 22.574063, 113.891472, 22.557965, 113.921591, 22.535562, 113.937038, 22.517732]
        setrouteopt(opt13)
        var optR13 = ['33988', '7132', '41', '12', '34', '29']
        setstdopt(optR13)
    }
    document.querySelector('#ori14').onclick = function() {
        var ori14 = [113.893932, 22.567904, 113.899168, 22.563713, 113.907229, 22.527346, 113.90202, 22.517789, 113.921913, 22.53431, 113.924614, 22.530921, 113.905948, 22.559647]
        setrouteori(ori14)
        var oriR14 = ['20457', '4185', '23', '22', '44', '38']
        setstdori(oriR14)
    }
    document.querySelector('#opt14').onclick = function() {
        var opt14 = [113.893932, 22.567904, 113.899404, 22.562054, 113.909707, 22.528476, 113.902607, 22.518654, 113.921591, 22.535562, 113.921071, 22.532495, 113.903942, 22.559731]
        setrouteopt(opt14)
        var optR14 = ['21925', '4696', '32', '16', '36', '28']
        setstdopt(optR14)
    }
    document.querySelector('#ori15').onclick = function() {
        var ori15 = [113.893932, 22.567904, 113.90202, 22.517789, 113.923016, 22.520114, 113.933484, 22.526272, 113.941285, 22.573192, 113.899168, 22.563713, 113.864171, 22.575448]
        setrouteori(ori15)
        var oriR15 = ['35606', '7629', '47', '47', '76', '42']
        setstdori(oriR15)
    }
    document.querySelector('#opt15').onclick = function() {
        var opt15 = [113.893932, 22.567904, 113.902607, 22.518654, 113.92212, 22.518132, 113.93247, 22.525471, 113.939056, 22.572479, 113.899404, 22.562054, 113.864595, 22.574063]
        setrouteopt(opt15)
        var optR15 = ['35335', '5583', '25', '14', '46', '42']
        setstdopt(optR15)
    }
    document.querySelector('#ori16').onclick = function() {
        var ori16 = [113.957935, 22.580678, 113.972654, 22.59163, 113.941285, 22.573192, 113.938384, 22.516783, 113.933484, 22.526272, 113.923016, 22.520114, 113.934395, 22.540373]
        setrouteori(ori16)
        var oriR16 = ['25398', '3986', '35', '46', '70', '41']
        setstdori(oriR16)
    }
    document.querySelector('#opt16').onclick = function() {
        var opt16 = [113.957935, 22.580678, 113.970742, 22.589347, 113.944099, 22.572344, 113.937038, 22.517732, 113.93247, 22.525471, 113.927018, 22.519827, 113.935725, 22.542756]
        setrouteopt(opt16)
        var optR16 = ['25448', '3547', '41', '24', '47', '39']
        setstdopt(optR16)
    }
    document.querySelector('#ori17').onclick = function() {
        var ori17 = [113.905362, 22.515433, 113.90202, 22.517789, 113.907229, 22.527346, 113.864171, 22.575448, 113.972654, 22.59163, 113.924614, 22.530921, 113.938384, 22.516783]
        setrouteori(ori17)
        var oriR17 = ['44574', '5659', '45', '27', '66', '56']
        setstdori(oriR17)
    }
    document.querySelector('#opt17').onclick = function() {
        var opt17 = [113.905362, 22.515433, 113.902607, 22.518654, 113.909707, 22.528476, 113.864595, 22.574063, 113.970742, 22.589347, 113.924319, 22.527468, 113.937038, 22.517732]
        setrouteopt(opt17)
        var optR17 = ['46837', '6015', '61', '25', '58', '51']
        setstdopt(optR17)
    }
    document.querySelector('#ori18').onclick = function() {
        var ori18 = [113.892275, 22.559044, 113.888248, 22.554537, 113.924614, 22.530921, 113.948581, 22.534589, 113.972654, 22.59163, 113.90202, 22.517789, 113.905948, 22.559647]
        setrouteori(ori18)
        var oriR18 = ['42072', '6335', '46', '30', '58', '41']
        setstdori(oriR18)
    }
    document.querySelector('#opt18').onclick = function() {
        var opt18 = [113.892275, 22.559044, 113.891472, 22.557965, 113.921071, 22.532495, 113.949852, 22.536378, 113.970742, 22.589347, 113.902607, 22.518654, 113.903942, 22.559731]
        setrouteopt(opt18)
        var optR18 = ['44180', '6598', '51', '20', '52', '44']
        setstdopt(optR18)
    }
    document.querySelector('#ori19').onclick = function() {
        var ori19 = [113.892275, 22.559044, 113.924614, 22.530921, 113.933484, 22.526272, 113.948581, 22.534589, 113.972654, 22.59163, 113.941285, 22.573192, 113.888248, 22.554537]
        setrouteori(ori19)
        var oriR19 = ['34887', '6865', '37', '45', '70', '39']
        setstdori(oriR19)
    }
    document.querySelector('#opt19').onclick = function() {
        var opt19 = [113.892275, 22.559044, 113.924319, 22.527468, 113.935201, 22.525083, 113.949852, 22.536378, 113.964262, 22.589391, 113.944099, 22.572344, 113.890222, 22.551852]
        setrouteopt(opt19)
        var optR19 = ['36164', '6905', '46', '27', '49', '39']
        setstdopt(optR19)
    }
    document.querySelector('#ori20').onclick = function() {
        var ori20 = [113.909279, 22.559439, 113.924614, 22.530921, 113.914631, 22.513432, 113.907229, 22.527346, 113.905948, 22.559647, 113.934395, 22.540373, 113.948581, 22.534589]
        setrouteori(ori20)
        var oriR20 = ['25924', '6070', '30', '42', '73', '48']
        setstdori(oriR20)
    }
    document.querySelector('#opt20').onclick = function() {
        var opt20 = [113.909279, 22.559439, 113.921071, 22.532495, 113.913301, 22.51198, 113.909707, 22.528476, 113.906613, 22.557076, 113.935725, 22.542756, 113.945539, 22.533836]
        setrouteopt(opt20)
        var optR20 = ['26324', '5601', '42', '15', '40', '36']
        setstdopt(optR20)
    }
    document.querySelector('#ori21').onclick = function() {
        var ori21 = [113.941978, 22.521637, 113.938384, 22.516783, 113.933484, 22.526272, 113.924614, 22.530921, 113.934395, 22.540373, 113.943561, 22.548272, 113.972654, 22.59163]
        setrouteori(ori21)
        var oriR21 = ['22739', '3276', '30', '41', '62', '34']
        setstdori(oriR21)
    }
    document.querySelector('#opt21').onclick = function() {
        var opt21 = [113.941978, 22.521637, 113.937038, 22.517732, 113.93247, 22.525471, 113.924319, 22.527468, 113.935725, 22.542756, 113.939361, 22.549669, 113.970742, 22.589347]
        setrouteopt(opt21)
        var optR21 = ['20491', '2515', '28', '15', '36', '32']
        setstdopt(optR21)
    }
    document.querySelector('#ori22').onclick = function() {
        var ori22 = [113.957935, 22.580678, 113.972654, 22.59163, 113.938384, 22.516783, 113.921913, 22.53431, 113.888248, 22.554537, 113.913696, 22.540707, 113.943561, 22.548272]
        setrouteori(ori22)
        var oriR22 = ['33300', '5170', '32', '31', '56', '33']
        setstdori(oriR22)
    }
    document.querySelector('#opt22').onclick = function() {
        var opt22 = [113.957935, 22.580678, 113.970742, 22.589347, 113.939425, 22.515125, 113.921591, 22.535562, 113.891472, 22.557965, 113.915059, 22.536644, 113.939361, 22.549669]
        setrouteopt(opt22)
        var optR22 = ['33985', '4972', '33', '18', '45', '38']
        setstdopt(optR22)
    }
    document.querySelector('#ori23').onclick = function() {
        var ori23 = [113.945821, 22.527439, 113.948581, 22.534589, 113.934395, 22.540373, 113.936926, 22.497938, 113.924614, 22.530921, 113.913696, 22.540707, 113.905948, 22.559647]
        setrouteori(ori23)
        var oriR23 = ['23870', '4982', '31', '39', '59', '41']
        setstdori(oriR23)
    }
    document.querySelector('#opt23').onclick = function() {
        var opt23 = [113.945821, 22.527439, 113.94555, 22.536299, 113.935725, 22.542756, 113.934951, 22.499955, 113.921071, 22.532495, 113.915059, 22.536644, 113.903942, 22.559731]
        setrouteopt(opt23)
        var optR23 = ['22881', '4098', '31', '13', '34', '34']
        setstdopt(optR23)
    }
    document.querySelector('#ori24').onclick = function() {
        var ori24 = [113.930553, 22.58178, 113.905948, 22.559647, 113.921913, 22.53431, 113.941285, 22.573192, 113.948581, 22.534589, 113.933484, 22.526272, 113.914631, 22.513432]
        setrouteori(ori24)
        var oriR24 = ['32815', '5526', '24', '45', '80', '52']
        setstdori(oriR24)
    }
    document.querySelector('#opt24').onclick = function() {
        var opt24 = [113.930553, 22.58178, 113.906613, 22.557076, 113.921591, 22.535562, 113.944099, 22.572344, 113.945539, 22.533836, 113.935201, 22.525083, 113.915865, 22.512352]
        setrouteopt(opt24)
        var optR24 = ['28395', '3870', '24', '14', '46', '43']
        setstdopt(optR24)
    }
    document.querySelector('#ori25').onclick = function() {
        var ori25 = [113.924182, 22.50632, 113.938384, 22.516783, 113.888248, 22.554537, 113.913696, 22.540707, 113.934395, 22.540373, 113.941285, 22.573192, 113.914631, 22.513432]
        setrouteori(ori25)
        var oriR25 = ['34647', '6187', '29', '44', '72', '47']
        setstdori(oriR25)
    }
    document.querySelector('#opt25').onclick = function() {
        var opt25 = [113.924182, 22.50632, 113.939425, 22.515125, 113.891472, 22.557965, 113.915059, 22.536644, 113.932909, 22.544451, 113.939056, 22.572479, 113.915865, 22.512352]
        setrouteopt(opt25)
        var optR25 = ['32892', '5139', '24', '10', '42', '41']
        setstdopt(optR25)
    }
    document.querySelector('#ori26').onclick = function() {
        var ori26 = [113.930553, 22.58178, 113.941285, 22.573192, 113.943561, 22.548272, 113.905948, 22.559647, 113.921913, 22.53431, 113.938384, 22.516783, 113.914631, 22.513432]
        setrouteori(ori26)
        var oriR26 = ['27035', '3783', '32', '40', '68', '54']
        setstdori(oriR26)
    }
    document.querySelector('#opt26').onclick = function() {
        var opt26 = [113.930553, 22.58178, 113.939056, 22.572479, 113.945278, 22.551923, 113.906613, 22.557076, 113.921591, 22.535562, 113.937038, 22.517732, 113.915865, 22.512352]
        setrouteopt(opt26)
        var optR26 = ['25114', '3098', '26', '16', '42', '41']
        setstdopt(optR26)
    }
    document.querySelector('#ori27').onclick = function() {
        var ori27 = [113.892275, 22.559044, 113.972654, 22.59163, 113.948581, 22.534589, 113.923016, 22.520114, 113.921913, 22.53431, 113.899168, 22.563713, 113.888248, 22.554537]
        setrouteori(ori27)
        var oriR27 = ['37863', '7831', '35', '30', '57', '26']
        setstdori(oriR27)
    }
    document.querySelector('#opt27').onclick = function() {
        var opt27 = [113.892275, 22.559044, 113.970742, 22.589347, 113.945539, 22.533836, 113.92212, 22.518132, 113.919579, 22.535906, 113.899404, 22.562054, 113.890222, 22.551852]
        setrouteopt(opt27)
        var optR27 = ['40735', '7050', '45', '19', '43', '31']
        setstdopt(optR27)
    }
    document.querySelector('#ori28').onclick = function() {
        var ori28 = [113.922764, 22.520902, 113.923016, 22.520114, 113.914631, 22.513432, 113.90202, 22.517789, 113.924614, 22.530921, 113.948581, 22.534589, 113.941285, 22.573192]
        setrouteori(ori28)
        var oriR28 = ['21232', '3715', '34', '32', '51', '36']
        setstdori(oriR28)
    }
    document.querySelector('#opt28').onclick = function() {
        var opt28 = [113.922764, 22.520902, 113.92212, 22.518132, 113.915865, 22.512352, 113.902607, 22.518654, 113.924319, 22.527468, 113.949852, 22.536378, 113.944099, 22.572344]
        setrouteopt(opt28)
        var optR28 = ['19058', '3085', '38', '8', '31', '30']
        setstdopt(optR28)
    }
    document.querySelector('#ori29').onclick = function() {
        var ori29 = [113.920117, 22.540565, 113.90202, 22.517789, 113.923016, 22.520114, 113.948581, 22.534589, 113.888248, 22.554537, 113.913696, 22.540707, 113.941285, 22.573192]
        setrouteori(ori29)
        var oriR29 = ['31915', '4684', '33', '37', '68', '48']
        setstdori(oriR29)
    }
    document.querySelector('#opt29').onclick = function() {
        var opt29 = [113.920117, 22.540565, 113.904005, 22.517497, 113.92212, 22.518132, 113.949852, 22.536378, 113.891472, 22.557965, 113.915059, 22.536644, 113.939056, 22.572479]
        setrouteopt(opt29)
        var optR29 = ['32684', '4267', '38', '15', '45', '44']
        setstdopt(optR29)
    }
    document.querySelector('#ori30').onclick = function() {
        var ori30 = [113.893932, 22.567904, 113.899168, 22.563713, 113.905948, 22.559647, 113.864171, 22.575448, 113.914631, 22.513432, 113.907229, 22.527346, 113.972654, 22.59163]
        setrouteori(ori30)
        var oriR30 = ['42860', '5985', '31', '34', '58', '39']
        setstdori(oriR30)
    }
    document.querySelector('#opt30').onclick = function() {
        var opt30 = [113.893932, 22.567904, 113.901947, 22.561756, 113.903942, 22.559731, 113.864595, 22.574063, 113.913301, 22.51198, 113.909707, 22.528476, 113.970742, 22.589347]
        setrouteopt(opt30)
        var optR30 = ['41741', '6367', '46', '20', '41', '36']
        setstdopt(optR30)
    }