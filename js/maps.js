/**
 * Created by RiMaStInO on 07/03/2016.
 */
jQuery(function ($) {
    // Asynchronously Load the map API
    var script = document.createElement('script');
    script.src = "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize";
    document.body.appendChild(script);
});

function initialize() {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
        mapTypeId: 'roadmap'
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    map.setTilt(45);

    // Multiple Markers
    var markers = [
        ['Via Panebianco, 2, 87100 Cosenza CS', 39.30802, 16.24739],
        ['Via Alessandro Volta, 130, 87036 Quattromiglia CS', 39.35594, 16.24364],
        ['Via Don Giovanni Minzoni, 77, 87036 Quattromiglia CS', 39.33618, 16.24167]
    ];

    // Info Window Content
    var infoWindowContent = [
        ['<div class="info_content">' +
        '<h3>OasiBlu</h3>' +
        '<p>Via Panebianco, 2, 87100 Cosenza CS.</p>' + '</div>'],
        ['<div class="info_content">' +
        '<h3>OasiBlu</h3>' +
        '<p>Via Alessandro Volta, 130, 87036 Quattromiglia CS.</p>' +
        '</div>'],
        ['<div class="info_content">' +
        '<h3>OasiBlu</h3>' +
        '<p>Via Don Giovanni Minzoni, 77, 87036 Quattromiglia CS.</p>' +
        '</div>']
    ];

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(), marker, i;

    // Loop through our array of markers & place each one on the map
    for (i = 0; i < markers.length; i++) {
        var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
        bounds.extend(position);
        marker = new google.maps.Marker({
            position: position,
            map: map,
            title: markers[i][0]
        });

        // Allow each marker to have an info window
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infoWindow.setContent(infoWindowContent[i][0]);
                infoWindow.open(map, marker);
            }
        })(marker, i));

        // Automatically center the map fitting all markers on the screen
        map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
        this.setZoom(12);
        google.maps.event.removeListener(boundsListener);
    });

}