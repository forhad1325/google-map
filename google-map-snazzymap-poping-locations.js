jQuery(document).ready(function ($) {
    let map;
    let markers = [];
    let maxZoom = 16; // Define max zoom level as a variable

    function initMap() {
        map = new google.maps.Map(document.getElementById("location_pin_popup_map"), {
            center: { lat: 28.1360069, lng: -96.9786523 }, // Default center
            zoom: 12,
            maxZoom: maxZoom, // Use maxZoom variable
            styles: [
                {
                    "featureType": "landscape.natural",
                    "elementType": "geometry.fill",
                    "stylers": [{ "visibility": "on" }, { "color": "#e0efef" }]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry.fill",
                    "stylers": [{ "visibility": "on" }, { "hue": "#1900ff" }, { "color": "#c0e8e8" }]
                },
                {
                    "featureType": "road",
                    "elementType": "geometry",
                    "stylers": [{ "lightness": 100 }, { "visibility": "simplified" }]
                },
                {
                    "featureType": "road",
                    "elementType": "labels",
                    "stylers": [{ "visibility": "off" }]
                },
                {
                    "featureType": "transit.line",
                    "elementType": "geometry",
                    "stylers": [{ "visibility": "on" }, { "lightness": 700 }]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [{ "color": "#7dcdcd" }]
                }
            ]
        });

        $(".location_tab_map").each(function () {
            let latitudes = String($(this).data("lat")).split(",");
            let longitudes = String($(this).data("lng")).split(",");
            let title = $(this).find(".elementor-icon-box-title").text().trim() || "Location";
            let markerGroup = [];

            if (latitudes.length === longitudes.length) {
                for (let i = 0; i < latitudes.length; i++) {
                    let lat = parseFloat(latitudes[i]);
                    let lng = parseFloat(longitudes[i]);

                    if (!isNaN(lat) && !isNaN(lng)) {
                        let marker = new google.maps.Marker({
                            position: { lat, lng },
                            map,
                            title: title
                        });

                        markerGroup.push(marker);
                        markers.push(marker);
                    }
                }
            }

            $(this).on("click", function () {
                let bounds = new google.maps.LatLngBounds();

                markers.forEach(m => m.setAnimation(null));

                markerGroup.forEach(marker => {
                    bounds.extend(marker.getPosition());
                    marker.setAnimation(google.maps.Animation.BOUNCE);
                    setTimeout(() => marker.setAnimation(null), 2000);
                });

                map.fitBounds(bounds);

                // Ensure max zoom level is respected
                google.maps.event.addListenerOnce(map, "bounds_changed", function () {
                    if (map.getZoom() > maxZoom) {
                        map.setZoom(maxZoom);
                    }
                });
            });
        });

        if (markers.length > 0) {
            let bounds = new google.maps.LatLngBounds();
            markers.forEach(marker => bounds.extend(marker.getPosition()));
            map.fitBounds(bounds);

            // Ensure max zoom level is respected
            google.maps.event.addListenerOnce(map, "bounds_changed", function () {
                if (map.getZoom() > maxZoom) {
                    map.setZoom(maxZoom);
                }
            });
        }
    }

    if (typeof google !== "undefined" && google.maps) {
        google.maps.event.addDomListener(window, "load", initMap);
    } else {
        console.error("Google Maps API is not loaded.");
    }
});
