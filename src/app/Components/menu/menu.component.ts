import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Models/user';
import { timeMessage } from '../../Functions/Alerts';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  sessionInit = false
  navBarActive = false
  user:User
  rute:String

  constructor( private authService:AuthService, private router:Router, private activatedRoute:ActivatedRoute, private location:Location ) {
    if (localStorage.getItem('myToken') != null) {
      this.authService.show().subscribe((o:any) => {
        this.user = o
      })
      this.sessionInit = true
      this.rute = location.path()
      console.log('aqui en menu |',this.sessionInit, '| user:', this.user,'| ruta:',this.rute )
    }
    if (this.rute == "" || this.rute == "/login" || this.rute == "/register" || this.rute == "/main") {
      this.navBarActive = false
    } else {
      this.navBarActive = true
    }
   }

  ngOnInit(): void {
  }

  logout() {
    timeMessage('Cerrando Sessión...', 1500).then(() => {
      localStorage.clear()
      this.sessionInit = false
      this.router.navigate(['/login'])
    })
  }

}
