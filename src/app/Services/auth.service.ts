import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { User } from '../Models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = environment.apiURL;
  header = new Headers({'Type-content': 'aplication/json', 'Authorization': 'Bearer ' + localStorage.getItem('myToken')});

  constructor( private http:HttpClient ) {
    this.header.append('Authorization', 'Bearer ' + localStorage.getItem('myToken'))
  }

  register(user:User): Observable<any> {
    return this.http.post(`${this.apiURL}register`, user)
  }

  login(user:User): Observable<any> {
    const token = this.http.post(`${this.apiURL}login`, user)
    return token
  }

  update(user:User): Observable<any> {
    return this.http.put(`${this.apiURL}api/user/`+user.id, user.email, {headers: this.header})
  }

  delete(id:number|string): Observable<any> {
    return this.http.delete(`${this.apiURL}api/user/`+id, {headers: this.header})
  }

  show() {
    return this.http.get(`${this.apiURL}api/user`, {headers: this.header})
  }
}
