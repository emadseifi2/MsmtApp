var AdminPanel = (function ($) {
    "use strict"

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-left",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "300",
        //"hideDuration": "1000",
        //"timeOut": "10000",
        //"extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    let _ceartMessage = (typeMessage, Title, Content) => {
        let titleMessage = document.createElement("h2");
        titleMessage.setAttribute("class", "text-white text-Medium text-right text-x7");
        var IconMessage = document.createElement("i");
        switch (typeMessage) {
            case "error":
                IconMessage.setAttribute("class", "text-white text-x15 far fa-tired");
                break;
            case "success":
                IconMessage.setAttribute("class", "text-white text-x15 far fa-grin-wink");
                break;
            case "info":
                IconMessage.setAttribute("class", "text-white text-x15 far fa-surprise");
                break;
            case "warning":
                IconMessage.setAttribute("class", "text-white text-x15 far fa-meh");
                break;
            default:
            //IconMessage.setAttribute("class", "text-white text-x14 far fa-frown-open");
        }
        IconMessage.setAttribute("style", "float : left");
        let titletextnode = document.createTextNode(Title);
        titleMessage.appendChild(titletextnode);
        titleMessage.appendChild(IconMessage);
        let ContentMessage = document.createElement("p");
        ContentMessage.setAttribute("class", "text-white text-Medium text-right text-x6");
        let Contenttextnode = document.createTextNode(Content);
        ContentMessage.appendChild(Contenttextnode);

        switch (typeMessage) {
            case "error":
                toastr.error(ContentMessage, titleMessage);
                break;
            case "success":
                toastr.success(ContentMessage, titleMessage);
                break;
            case "info":
                toastr.info(ContentMessage, titleMessage);
                break;
            case "warning":
                toastr.warning(ContentMessage, titleMessage);
                break;
            default:
                toastr.warning("نوع پیام شما مشخص نشده است ...", "خطا در نوع پیام");
        }
    }

    let _loadMap = () => {
        mapboxgl.accessToken = "pk.eyJ1IjoibXNtdGlyYW4xIiwiYSI6ImNsOGZpb2FlejFnMmEzb21yeDkybmU4NDEifQ.RFjBexxXqyVc9OckIYPMOQ";
        mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js', null, true);
        map = new mapboxgl.Map({
            style: 'mapbox://styles/msmtiran1/cl8fj3j8t006a14pqh7u31046',
            center: [54.184599, 32.246213],
            pitch: 0,
            zoom: 4,
            container: 'map',
            antialias: true,
        });
        map.addControl(new mapboxgl.NavigationControl());
    };

    let _province = () => {
        var StateValue = document.getElementById("State").value;
        console.log(StateValue);
        var Province = ProvinceIran.features;       
        console.log(Province);
        for (var i = 0; i < Province.length; i++) {
            let chekState = Province[i].properties.name;
            if (StateValue === chekState) {               
                let coordinatesProvince = Province[i].geometry.coordinates;
                let lonProvince = Province[i].properties.lon;
                let latProvince = Province[i].properties.lat;
                let Zoom = Province[i].properties.zoomLevel;
                map.flyTo({
                    bearing: 0,
                    center: [lonProvince, latProvince],
                    zoom: Zoom,
                    pitch: 0,
                    essential: true
                });

                let mapLayer = map.getLayer("maine");
                if (typeof mapLayer !== 'undefined') {
                    map.removeLayer("maine");
                    map.removeSource("maine");
                };

                map.addSource('maine', {
                    'type': 'geojson',
                    'data': {
                        'type': 'Feature',
                        'geometry': {
                            'type': 'Polygon',
                            // These coordinates outline Maine.
                            'coordinates': coordinatesProvince
                        }
                    }
                });

                // Add a new layer to visualize the polygon.
                map.addLayer({
                    'id': 'maine',
                    'type': 'fill',
                    'source': 'maine', // reference the data source
                    'layout': {},
                    'paint': {
                        'fill-color': '#c5c5c5', // blue color fill
                        'fill-opacity': 0.2
                    }
                });
                // Add a black outline around the polygon.
                map.addLayer({
                    'id': 'outline',
                    'type': 'line',
                    'source': 'maine',
                    'layout': {},
                    'paint': {
                        'line-color': '#4e4e4e',
                        'line-width': 1
                    }
                });
            }
        };
    }

    let _addMarker = (e) => {
        var lat = e.lngLat.lat;
        var lng = e.lngLat.lng;

        if (currentMarkers !== null) {
            for (var i = currentMarkers.length - 1; i >= 0; i--) {
                currentMarkers[i].remove();
            }
        }

        let oneMarker = new mapboxgl.Marker()
            .setLngLat([lng, lat])
            .addTo(map);

        currentMarkers.push(oneMarker);

        map.flyTo({
            center: [lng, lat]
        });

        let lngValue = (lng).toFixed(7);
        let LatValue = (lat).toFixed(7);
        document.getElementById("Longitude").value = lngValue;
        document.getElementById("latitude").value = LatValue;
    };

    // Exposing Public Methods....
    return {
        //tools & control map....................
        CeartMessage: _ceartMessage,
        LoadMap: _loadMap,
        Province: _province,
        AddMarker: _addMarker
    };

})(window.jQuery);

//let _lngMap = map.getCenter().lng.toFixed(6);
//let _latMap = map.getCenter().lat.toFixed(6);

//var marker = new mapboxgl.Marker({
//    draggable: true
//})
//    .setLngLat([_lngMap, _latMap])
//    .addTo(map);

//function onDragEnd() {
//    let lngLat = marker.getLngLat();
//    let lng = (lngLat.lng).toFixed(6);
//    let Lat = (lngLat.lat).toFixed(6);
//    document.getElementById("Longitude").value = lng;
//    document.getElementById("latitude").value = Lat;
//}

//marker.on('dragend', onDragEnd);