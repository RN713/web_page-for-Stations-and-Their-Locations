import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { Loader } from '@googlemaps/js-api-loader';
import { HttpClient } from '@angular/common/http';
import { Station } from '../station.model'; 

declare var google: any; // Declare google variable

@Component({
  selector: 'app-my-component',
  standalone: true,
  imports: [AppComponent],
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css']
})
export class MyComponent implements OnInit {
  private apiUrl = 'https://localhost:7293/api/AngStation/GetStation';
  private map: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const loader = new Loader({
      apiKey: 'AIzaSyAYe1_hmfDvkQr-J-WSjBdRnmWktCN_In8'
    });

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.8859, lng: 45.0792 },
        zoom: 5
      });
    });
  }

  displayStations(): void {
    this.fetchStations();
  }

  private fetchStations(): void {
    this.http.get<Station[]>(this.apiUrl).subscribe(stations => {
      this.addMarkers(stations);
    });
  }

  private addMarkers(stations: Station[]): void {
    stations.forEach(station => {
      const marker = new google.maps.Marker({
        position: { lat: station.Lat, lng: station.Lon },
        map: this.map,
        title: station.Code // Optional: Show station code on hover
        
      });
    });
  }
}