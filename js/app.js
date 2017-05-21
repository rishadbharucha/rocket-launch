function initApp() {
  var locations;
  var rocketIds = [1, 72, 44, 52];
  var rockets = launch.getData(rocketIds);

  setTimeout(function () {
    locations = launch.getLocations(rockets);
    select.init(locations);
    maps.init(locations);
  }, 1000);
}