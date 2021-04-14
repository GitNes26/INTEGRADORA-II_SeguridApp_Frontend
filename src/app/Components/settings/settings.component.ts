import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { SensorService } from '../../Services/sensor.service';
import { User } from '../../Models/user';
import { Sensor } from '../../Models/sensor';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  user:User
  sensorArray:Sensor[] = []

  constructor( private authService:AuthService, private sensorService:SensorService) {
    this.showProfile()
  }

  ngOnInit(): void {
  }

  showProfile() {
    this.authService.show().subscribe((o:any) => {
      this.user = o
    })
  }

}
