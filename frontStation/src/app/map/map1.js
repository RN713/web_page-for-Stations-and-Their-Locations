function showMap() {
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
  window.Stations = []; // This should be populated with your station data