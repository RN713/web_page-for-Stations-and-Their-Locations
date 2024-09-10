import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Station } from '../station.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; // Import MatTableDataSource

declare var google: any; // Declare google variable


@Component({
  selector: 'app-map',
  standalone: true,
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  imports: [MatTableModule] // Import MatTableModule here
})
export class MapComponent {
  stations: Station[] = [];
  displayedColumns: string[] = ['Id', 'Code', 'RegionName', 'geolocation'];
  dataSource = new MatTableDataSource<Station>(this.stations); // Initialize dataSource
  apiUrl = 'https://localhost:7293/api/AngStation/GetStation';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchStations();
  }

  fetchStations(): void {
    this.http.get<Station[]>(this.apiUrl).subscribe(
      (data) => {
        this.stations = data;
        this.dataSource.data = this.stations; // Assign data to dataSource
      },
      (error) => {
        console.error('Error fetching stations:', error);
      }
    );
  }

  

  getGeolocation(station: Station): void {
    console.log(`Geolocation for ${station.Code}: Lat ${station.Lat}, Lon ${station.Lon}`);
  }

  openGeolocation(lat: number, lon: number): void {
    const url = `https://www.google.com/maps/place/${lat},${lon}`;
    window.open(url, '_blank');
  }

  GetStation() {
    this.http.get<Station[]>("https://localhost:7293/api/AngStation/GetStation").subscribe(
      (res) => {
        console.log('Stations fetched:', res);
        this.stations = res;
        // Update the global Stations variable
        (window as any).Stations = res; // Set global variable for use in map.js
      },
      (error) => {
        console.error('Error fetching stations:', error);
      }
    );
  }
/*
  apiUrl1="https://maps.googleapis.com/maps/api/js?key=AIzaSyAYe1_hmfDvkQr-J-WSjBdRnmWktCN_In8&callback=initMap";
fetchStations1(): void {
  this.http.get<Station[]>(this.apiUrl1).subscribe(
    (data) => {
      this.stations = data;
      this.dataSource.data = this.stations;
      (window as any).Stations = data; // Set global variable for use in initMap
    },
    (error) => {
      console.error('Error fetching stations:', error);
    }
  );
}

showMap(): void {
  this.initMap(); // Call the initMap function
}

initMap(): void {
  const mapElement = document.getElementById("map");

  // Check if mapElement is not null
  if (!mapElement) {
    console.error('Map element not found');
    return; // Exit the function if the element is not found
  }

  // Use the stations array directly from the component
  const centerLat = this.stations.length > 0 ? this.stations[0].Lat : 0;
  const centerLng = this.stations.length > 0 ? this.stations[0].Lon : 0;

  const map = new google.maps.Map(mapElement, {
    zoom: 5,
    center: { lat: centerLat, lng: centerLng },
  });

  this.stations.forEach(station => {
    new google.maps.Marker({
      position: { lat: station.Lat, lng: station.Lon },
      map: map,
      title: station.Code,
    });
  });
}
<button mat-button (click)="showMap()">Show All Locations on Map</button>
  <div id="map" style="height: 500px; width: 100%;"></div>*/

}