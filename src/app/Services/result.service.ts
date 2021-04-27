import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { Result } from '../Models/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  apiURL = environment.apiURL
  header = new HttpHeaders({'Type-content': 'aplication/json', 'Authorization': 'Bearer '+localStorage.getItem('myToken')})

  constructor( private http:HttpClient) {
    this.header.append('Authorization', 'Bearer '+ localStorage.getItem('myToken'))
  }

  store(result:Result) {
    return this.http.post(`${this.apiURL}api/result`, result, {headers:this.header})
  }

  tempMax() {
    return this.http.get(`${this.apiURL}api/result/tempMax`, {headers:this.header})
  }

  tempMin() {
    return this.http.get(`${this.apiURL}api/result/tempMin`, {headers:this.header})
  }

  humMax() {
    return this.http.get(`${this.apiURL}api/result/humMax`, {headers:this.header})
  }

  humMin() {
    return this.http.get(`${this.apiURL}api/result/humMin`, {headers:this.header})
  }

  presenceCounter() {
    return this.http.get(`${this.apiURL}api/result/presenceCounter`, {headers:this.header})
  }

  deleteHistory() {
    return this.http.delete(`${this.apiURL}api/result`, {headers: this.header})
  }
}
