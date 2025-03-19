jQuery(document).ready(function ($) {
    let map;
    let markers = [];

    function initMap() {
        map = new google.maps.Map(document.getElementById("location_pin_popup_map"), {
            center: { lat: 28.1360069, lng: -96.9786523 }, // Default center
            zoom: 6,
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
            let markerGroup = []; // Store markers for each location

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

            // Click event to pan to all locations associated with this element
            $(this).on("click", function () {
                let bounds = new google.maps.LatLngBounds();
                
                // Stop all animations
                markers.forEach(m => m.setAnimation(null));

                // Set map view to show all locations from this element
                markerGroup.forEach(marker => {
                    bounds.extend(marker.getPosition());
                    marker.setAnimation(google.maps.Animation.BOUNCE); // Bounce effect
                    setTimeout(() => marker.setAnimation(null), 2000);
                });

                // Fit map to bounds smoothly
                map.fitBounds(bounds);
            });
        });

        // Adjust the map view to show all markers initially
        if (markers.length > 0) {
            let bounds = new google.maps.LatLngBounds();
            markers.forEach(marker => bounds.extend(marker.getPosition()));
            map.fitBounds(bounds);
        }
    }

    if (typeof google !== "undefined" && google.maps) {
        google.maps.event.addDomListener(window, "load", initMap);
    } else {
        console.error("Google Maps API is not loaded.");
    }
});
