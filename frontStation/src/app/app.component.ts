import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Station } from './station.model';
//import { MainComponent } from "./main/main.component";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { MapComponent } from './map/map.component';
import { MyComponent } from './my-component/my-component.component'; 


//declare var google: any; // Declare google variable


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, HttpClientModule, FormsModule, ReactiveFormsModule, MapComponent, MyComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'frontStation';
  Stations: Station[] = [];
  newStation: Station = { Id: 0, Code: '', Lat: 0, Lon: 0, RegionName: '' }; // Initialize a new station
  selectedStation: Station | null = null; // To hold the selected station details
  

  APIURL = "https://localhost:7293/api/";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.GetStation();
  }

  GetStation() {
    this.http.get<Station[]>("https://localhost:7293/api/AngStation/GetStation").subscribe(
      (res) => {
        console.log('Stations fetched:', res); // Log the response
        this.Stations = res;
      },
      (error) => {
        console.error('Error fetching stations:', error); // Log any errors
      }
    );
  }

  PostStation() {
    this.http.post("https://localhost:7293/api/AngStation/PostStation", this.newStation).subscribe(response => {
      console.log(response);
      this.GetStation(); // Refresh the station list after adding
      this.resetForm(); // Clear the form
    }, error => {
      console.error('Error adding station:', error);
    });
  }

  resetForm() {
    this.newStation = { Id: 0, Code: '', Lat: 0, Lon: 0, RegionName: '' }; // Reset to initial state
  }


  DeleteStation(id: number) {
    this.http.delete(`https://localhost:7293/api/AngStation/DeleteStation/${id}`).subscribe(response => {
      console.log(response);
      this.GetStation(); // Refresh the station list after deletion
    }, error => {
      console.error('Error deleting station:', error);
    });
  }



  GetStationById(id: number) {
    this.http.get<Station>(`https://localhost:7293/api/AngStation/GetStationById/${id}`).subscribe(response => {
      this.selectedStation = response; // Set the selected station details
    }, error => {
      console.error('Error fetching station:', error);
      this.selectedStation = null; // Reset if there's an error
    });
  }


  UpdateStation() {
    if (this.selectedStation) {
        this.http.put(`https://localhost:7293/api/AngStation/UpdateStation/${this.selectedStation.Id}`, this.selectedStation)
            .subscribe(response => {
                console.log(response);
                this.GetStation(); // Refresh the station list after updating
                this.selectedStation = null; // Clear selection after update
            }, error => {
                console.error('Error updating station:', error);
            });
    }
}





}


