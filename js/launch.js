var launch = (function () {

  var url = 'https://launchlibrary.net/1.2/';

  // Make a single request to get rocket data
  var newRocket = function (id, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open('GET', url + 'rocket/' + id);
    xhttp.send();
  };

  // Make a single request to get pad data
  var newPad = function (id, callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callback(JSON.parse(xhttp.responseText));
      }
    };
    xhttp.open('GET', url + 'pad/' + id);
    xhttp.send();
  };

  // Get a number of rockets
  var getRockets = function (ids) {
    var rockets = [];
    var callback = function (response) {
      var pads = parseDefaultPads(response.rockets[0].defaultPads);
      rockets.push({
        id: response.rockets[0].id,
        name: response.rockets[0].name,
        pads: getPads(pads)
      });
    };
    for (var i = 0; i < ids.length; i++) {
      newRocket(ids[i], callback);
    }
    return rockets;
  };

  // Get the location of a rocket pad
  var getPad = function (id, inputCallback) {
    var location;
    var callback = function (response) {
      location = {
        lat: response.pads[0].latitude,
        lng: response.pads[0].longitude
      };
      inputCallback(location);
    };
    newPad(id, callback);
  };

  // Get the location of an array of rocket pads
  var getPads = function (pads) {
    var locations = [];
    var callback = function (pad) {
      locations.push(pad);
    };
    for (var i = 0; i < pads.length; i++) {
      getPad(pads[i], callback);
    }
    return locations;
  };

  // Get all the rocket pad locations
  var getLocations = function (rockets) {
    var locations = [];
    for (var i = 0; i < rockets.length; i++) {
      for (var j = 0; j < rockets[i].pads.length; j++) {
        locations.push(Object.assign({}, {
          name: rockets[i].name
        }, rockets[i].pads[j]));
      }
    }
    return locations;
  };

  // Parse the default pads string
  var parseDefaultPads = function (defaultPads) {
    var pads = defaultPads.split(",");
    for (var i = 0; i < pads.length; i++) {
      pads[i] = parseInt(pads[i]);
    }
    return pads;
  };

  return {
    getData: function (rocketIds) {
      var rockets = getRockets(rocketIds);
      return rockets;
    },
    getLocations: getLocations
  };

})();