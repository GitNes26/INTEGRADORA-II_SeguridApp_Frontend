import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class CheckLoginGuard implements CanActivate {

  // loggedIn = false

  constructor (private router:Router) {}
  
  canActivate(): boolean {
    if (localStorage.getItem('myToken') != null) {
      return true
    } else {
      return false
    }
  }

  // goTo(bool:boolean) {
  //   if (bool) {
  //     console.log('usuario logeado, vamos al main');
  //     this.router.navigate(['main'])
  //     this.loggedIn = false
  //   }
  // }
  
}
