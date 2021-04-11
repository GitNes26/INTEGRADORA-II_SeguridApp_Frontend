import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { LocationModel } from '../Models/locationModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  apiURL = environment.apiURL
  header = new HttpHeaders({'Type-content': 'aplication/json', 'Authorization': 'Bearer '+localStorage.getItem('myToken')})

  constructor( private http:HttpClient) {
    this.header.append('Authorization', 'Bearer '+ localStorage.getItem('myToken'))
    console.log('estoy en Locationservice');
    
  }

  add(location:LocationModel): Observable<any> {
    return this.http.post(`${this.apiURL}api/location`, location, {headers:this.header})
  }

  update(location:LocationModel): Observable<any> {
    return this.http.put(`${this.apiURL}api/location/`+location._id, location, {headers:this.header})
  }

  delete(name:string): Observable<any> {
    return this.http.delete(`${this.apiURL}api/location/`+name, {headers:this.header})
  }

  showMyLocations() {
    return this.http.get(`${this.apiURL}api/location`, {headers:this.header})
  }
}
