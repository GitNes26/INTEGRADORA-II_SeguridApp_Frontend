import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotLoggedInGuard implements CanActivate {
  canActivate(): boolean {
      if (localStorage.getItem('myToken') == null) {
        return true
      } else {
        return false
      }
  }
  
}
