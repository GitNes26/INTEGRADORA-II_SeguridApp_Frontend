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
  
  private logged = new BehaviorSubject<boolean>(false)

  constructor( private http:HttpClient ) {
    this.header.append('Authorization', 'Bearer ' + localStorage.getItem('myToken'))
    // console.log('logged -->',this.logged);
    
  }

  get isLogged(): Observable<boolean> {
    return this.logged.asObservable()
  }

  register(user:User): Observable<any> {
    return this.http.post(`${this.apiURL}api/register`, user)
  }

  login(user:User): Observable<any> {
    const token = this.http.post(`${this.apiURL}api/login`, user)
    if (token) {
      this.logged.next(true)
    }
    return token
  }

  update(user:User): Observable<any> {
    return this.http.put(`${this.apiURL}api/user/`+user.id, user.email, {headers: this.header})
  }

  delete(id:number|string): Observable<any> {
    return this.http.delete(`${this.apiURL}api/user/`+id, {headers: this.header})
  }

  show() {
    const user = this.http.get(`${this.apiURL}api/profile`, {headers: this.header})
    return user
  }
}
