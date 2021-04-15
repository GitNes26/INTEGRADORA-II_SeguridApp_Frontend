import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../Models/user';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  header = new HttpHeaders({'Type-content': 'aplication/json', 'Authorization': 'Bearer ' + localStorage.getItem('myToken')});
  

  constructor( private http:HttpClient ) {
    this.header.append('Authorization', 'Bearer ' + localStorage.getItem('myToken'))
    // console.log('logged -->',this.logged);
    
  }

  register(user:User): Observable<any> {
    return this.http.post(`${this.apiURL}api/register`, user)
  }

  login(user:User): Observable<any> {
    const token = this.http.post(`${this.apiURL}api/login`, user)
    return token
  }

  update(user:User): Observable<any> {
    return this.http.put(`${this.apiURL}api/user`, user, {headers: this.header})
  }

  delete(): Observable<any> {
    return this.http.delete(`${this.apiURL}api/user`, {headers: this.header})
  }

  show() {
    const user = this.http.get(`${this.apiURL}api/profile`, {headers: this.header})
    return user
  }
}
