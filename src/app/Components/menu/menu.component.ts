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
  username:string
  rute:String

  constructor( private authService:AuthService, private router:Router, private activatedRoute:ActivatedRoute, /*private path:Location*/ ) {
    if (localStorage.getItem('myToken') != null) {
      this.sessionInit = true
      console.log('aqui en menu |',this.sessionInit, '| user:', this.user,'| ruta:',this.rute )
    }
    this.profile()
  }

  ngOnInit(): void {
  }

  profile() {
    this.authService.show().subscribe((o:any) => {
      this.user = o
      this.username = this.user.name      
    })
  }

  logout() {
    timeMessage('Cerrando Sesión...', 1500).then(() => {
      localStorage.clear()
      this.sessionInit = false
      this.navBarActive = false
      this.router.navigate(['/login'])
    })
  }

}
