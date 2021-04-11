import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Sensor } from '../Models/sensor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  apiURL = environment.apiURL
  header = new HttpHeaders({'Type-content': 'aplication/json', 'Authorization': 'Bearer '+localStorage.getItem('myToken')})

  constructor( private http:HttpClient) {
    this.header.append('Authorization', 'Bearer '+ localStorage.getItem('myToken'))
  }

  add(sensor:Sensor): Observable<any> {
    console.log('estamos en el sevicio sensorAdd:',sensor)
    return this.http.post(`${this.apiURL}api/sensor`, sensor, {headers:this.header})
  }

  update(sensor:Sensor): Observable<any> {
    return this.http.put(`${this.apiURL}api/sensor/`+sensor.id, sensor, {headers:this.header})
  }

  delete(id:number|string): Observable<any> {
    return this.http.delete(`${this.apiURL}api/sensor/`+id, {headers:this.header})
  }

  showMySensors() {
    return this.http.get(`${this.apiURL}api/sensor`, {headers:this.header})
  }

  showMySensorsByLocation(location:string): Observable<any> {
    return this.http.get(`${this.apiURL}api/sensor/`+location, {headers:this.header})
  }
}
