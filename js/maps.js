var maps = (function () {

  var initMap = function (markers) {
    var map = new google.maps.Map(document.getElementById('map'));
    var bounds = new google.maps.LatLngBounds();

    // Loop through our array of markers & place each one on the map
    for (i = 0; i < markers.length; i++) {
      var position = new google.maps.LatLng(markers[i].lat, markers[i].lng);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i].name
      });

      // Automatically center the map fitting all markers on the screen
      map.fitBounds(bounds);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function (event) {
      this.setZoom(3);
      google.maps.event.removeListener(boundsListener);
    });
  }

  return {
    init: initMap
  }

})();