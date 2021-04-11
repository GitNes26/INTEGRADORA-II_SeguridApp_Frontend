import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../Models/user';
import { LocationModel } from '../../Models/locationModel'
import { timeMessage } from '../../Functions/Alerts';
import { Location } from '@angular/common';
import { LocationService } from '../../Services/location.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  sessionInit = false
  navBarActive = false
  user:User
  locationPath:LocationModel
  locationArray:LocationModel[] = []
  rute:String

  constructor( private authService:AuthService, private router:Router, private activatedRoute:ActivatedRoute, private service:LocationService /*private path:Location*/ ) {
    if (localStorage.getItem('myToken') != null) {
      this.authService.show().subscribe((o:any) => {
        this.user = o
      })
      this.sessionInit = true
      // this.rute = path.path()
      console.log('aqui en menu |',this.sessionInit, '| user:', this.user,'| ruta:',this.rute )
    }
    // if (this.rute == undefined || this.rute == "/login" || this.rute == "/register" || this.rute == "/main") {
    //   this.navBarActive = false
    // } else {
    //   this.navBarActive = true
    // }
    // console.log('rute:',this.rute, 'navBar: ',this.navBarActive)
    // console.log('nombre de locacion', this.locationName())
    this.locationName()
  }

  ngOnInit(): void {
  }

  logout() {
    timeMessage('Cerrando Sessión...', 1500).then(() => {
      localStorage.clear()
      this.sessionInit = false
      this.navBarActive = false
      this.router.navigate(['/login'])
    })
  }

  locationName() {
    this.service.showMyLocations().subscribe((o:any) => {
      this.locationArray = o
      this.locationPath = this.locationArray[0]
      console.log('locationName()',this.locationPath)
      return this.locationPath.name
    })
  }

}
