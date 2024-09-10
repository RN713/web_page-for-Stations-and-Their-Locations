/*function showMap() {
  initMap();
}

function initMap() {
  const mapElement = document.getElementById("map");

  // Use the global Stations variable populated with your station data
  const centerLat = Stations.length > 0 ? Stations[0].Lat : 0;
  const centerLng = Stations.length > 0 ? Stations[0].Lon : 0;

  const map = new google.maps.Map(mapElement, {
    zoom: 5,
    center: { lat: centerLat, lng: centerLng },
  });

  Stations.forEach(station => {
    const marker = new google.maps.Marker({
      position: { lat: station.Lat, lng: station.Lon },
      map: map,
      title: station.Code,
    });
  });
}

// Ensure that this variable is populated in the context
window.Stations = []; // This should be populated with your station data */

let map;

// Array of markers
/*let markers = [
    {
        coordinates: { lat: 24.888413, lng: 46.446506 },
        iconImage: 'https://img.icons8.com/fluent/48/000000/marker-storm.png',
        content: '<h4>Hulme</h4>'
    },
    {
        coordinates: { lat: 53.463842391942, lng: -2.247733682839402 }
    }
]*/


function initMap() {
  const options = {
      zoom: 5,
      center: {lat: 23.8859, lng: 45.0792}
  }

  map = new google.maps.Map(
      document.getElementById('map'),
      options
  ) }