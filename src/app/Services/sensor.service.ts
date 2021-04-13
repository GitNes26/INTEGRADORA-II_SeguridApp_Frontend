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

  add() {
    console.log('estamos en el sevicio sensorAdd:')
    return this.http.post(`${this.apiURL}api/sensor`, {headers:this.header})
  }

  showMySensors() {
    return this.http.get(`${this.apiURL}api/sensor`, {headers:this.header})
  }
}
