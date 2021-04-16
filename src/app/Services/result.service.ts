import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  apiURL = environment.apiURL
  header = new HttpHeaders({'Type-content': 'aplication/json', 'Authorization': 'Bearer '+localStorage.getItem('myToken')})

  constructor( private http:HttpClient) {
    this.header.append('Authorization', 'Bearer '+ localStorage.getItem('myToken'))
  }

  tempMax() {
    return this.http.get(`${this.apiURL}api/result/tempMax`, {headers:this.header})
  }

  tempMin() {
    return this.http.get(`${this.apiURL}api/result/tempMin`, {headers:this.header})
  }

  presenceCounter() {
    return this.http.get(`${this.apiURL}api/result/presenceCounter`, {headers:this.header})
  }
}
