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
		
    //<!-- SAMPLE 12 Optimal -->
	function opt12() {
		var drivingOption = {
			policy: AMap.DrivingPolicy.LEAST_TIME, // policy ref: https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
		}

		// Drving Route API
		var driving = new AMap.Driving(drivingOption)
		 
		var a = 113.892275
		var b = 22.559044
		// Route
		driving.search(new AMap.LngLat(a,b), new AMap.LngLat(113.864595,22.574063), {
			waypoints:[new AMap.LngLat(113.890222,22.551852),new AMap.LngLat(113.915059,22.536644),new AMap.LngLat(113.921591,22.535562),new AMap.LngLat(113.924319,22.527468),new AMap.LngLat(113.970742,22.589347)]
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
			position: new AMap.LngLat(a,b),
			title: 'Dep',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png'
		});
		
		var marker1 = new AMap.Marker({
			position: new AMap.LngLat(113.890222,22.551852),
			title: 'Way1',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker2 = new AMap.Marker({
			position: new AMap.LngLat(113.915059,22.536644),
			title: 'Way2',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker3 = new AMap.Marker({
			position: new AMap.LngLat(113.921591,22.535562),
			title: 'Way3',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});	
		
		var marker4 = new AMap.Marker({
			position: new AMap.LngLat(113.924319,22.527468),
			title: 'Way4',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});

		var marker5 = new AMap.Marker({
			position: new AMap.LngLat(113.970742,22.589347),
			title: 'Way5',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
			});
		
		var marker6 = new AMap.Marker({
			position: new AMap.LngLat(113.864595,22.574063),
			title: 'Des',
			icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
		});
		
		var markerList = [marker1, marker2, marker3, marker4, marker5, marker6];
		map.add(markerList);
		
	}
    document.querySelector("#s12opt").onclick = opt12
	
    //绑定按钮事件，改变地图中心点
    document.querySelector("#random-center-btn").onclick = function() {
    var drivingOption = {
        policy: AMap.DrivingPolicy.LEAST_TIME, // 其它policy参数请参考 https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingPolicy 
    }

    // 构造路线导航类
    var driving = new AMap.Driving(drivingOption)

    // 根据起终点经纬度规划驾车导航路线
    driving.search(new AMap.LngLat(113.892275,22.559044), new AMap.LngLat(113.890222,22.551852), {
        waypoints:[new AMap.LngLat(113.970742,22.589347),new AMap.LngLat(113.945278,22.551923),new AMap.LngLat(113.935725,22.542756),new AMap.LngLat(113.909707,22.528476),new AMap.LngLat(113.903942,22.559731)]
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
    var marker0 = new AMap.Marker({
        position: new AMap.LngLat(113.892275,22.559044),
        title: 'Driver Location',
        icon: 'https://gisedu.itc.utwente.nl/student/s6040071/car_24px_1132259_easyicon.net.png'
	});

    var marker1 = new AMap.Marker({
        position: new AMap.LngLat(113.970742,22.589347),
        title: 'Way01',
        icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
	});

    var marker2 = new AMap.Marker({
        position: new AMap.LngLat(113.945278,22.551923),
        title: 'Way02',
        icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
	});

    var marker3 = new AMap.Marker({
        position: new AMap.LngLat(113.935725,22.542756),
        title: 'Way03',
        icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
	});

    var marker4 = new AMap.Marker({
        position: new AMap.LngLat(113.909707,22.528476),
        title: 'Way04',
        icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
	});

    var marker5 = new AMap.Marker({
        position: new AMap.LngLat(113.903942,22.559731),
        title: 'Way05',
        icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
	});

    var marker6 = new AMap.Marker({
        position: new AMap.LngLat(113.890222,22.551852),
        title: 'Way06',
        icon: 'https://gisedu.itc.utwente.nl/student/s6040071/Pedestrian_Crossing_32px_567163_easyicon.net.png'
	});

	
	var markerList = [marker0,marker1, marker2, marker3, marker4, marker5, marker6];
	map.add(markerList);
    }

    //绑定按钮事件，改变地图层级与中心点
    document.querySelector("#random-zoomcenter-btn").onclick = function() {
 
    }	
	