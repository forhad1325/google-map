jQuery(document).ready(function ($) {
    function initIndividualMaps() {
        $(".location_individual_map").each(function () {
            let $this = $(this);
            let latData = $this.data("lat");
            let lngData = $this.data("lng");

            if (!latData || !lngData) {
                console.error("Missing lat/lng data for map.");
                return;
            }

            // Convert string data into an array, handling both single and multiple locations
            let latArray = latData.toString().split(",").map(Number);
            let lngArray = lngData.toString().split(",").map(Number);

            if (latArray.length !== lngArray.length) {
                console.error("Mismatch in Lat/Lng data count.");
                return;
            }

            let map = new google.maps.Map(this, {
                center: { lat: latArray[0], lng: lngArray[0] }, // Default to first location
                zoom: 12, // Default zoom for single locations
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

            let bounds = new google.maps.LatLngBounds();
            let markers = [];

            latArray.forEach((lat, i) => {
                let lng = lngArray[i];
                let position = { lat, lng };

                let marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: "Location " + (i + 1),
                });

                markers.push(marker);
                bounds.extend(marker.getPosition());
            });

            // Adjust zoom dynamically if multiple locations exist
            if (latArray.length > 1) {
                map.fitBounds(bounds);

                // Fine-tune zoom level to avoid too much zoom-out
                google.maps.event.addListenerOnce(map, "bounds_changed", function () {
                    if (map.getZoom() > 15) {
                        map.setZoom(15); // Limit zoom-in if markers are close
                    }
                });
            }
        });
    }

    if (typeof google !== "undefined") {
        google.maps.event.addDomListener(window, "load", initIndividualMaps);
    }
});
