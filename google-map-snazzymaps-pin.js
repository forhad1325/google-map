jQuery(document).ready(function ($) {
    function initIndividualMaps() {
        $(".location_individual_map").each(function () {
            let $this = $(this);
            let lat = parseFloat($this.data("lat"));
            let lng = parseFloat($this.data("lng"));

            if (!isNaN(lat) && !isNaN(lng)) {
                let map = new google.maps.Map(this, {
                    center: { lat, lng },
                    zoom: 8, // Adjust zoom level as needed
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

                new google.maps.Marker({
                    position: { lat, lng },
                    map: map,
                    title: "Location",
                });
            }
        });
    }

    if (typeof google !== "undefined") {
        google.maps.event.addDomListener(window, "load", initIndividualMaps);
    }
});
