var select = (function () {

  var initSelect = function (locations) {

    var menu = document.getElementById('menu');

    for (var i = 0; i < locations.length; i++) {
      var option = document.createElement('option');
      option.text = 'Lat: ' + locations[i].lat + ', Long: ' + locations[i].lng;

      // This can be substituted with a function call that filters the map accordingly
      option.value = locations[i].lat;

      menu.appendChild(option);
    }
  };

  return {
    init: initSelect
  }

})();