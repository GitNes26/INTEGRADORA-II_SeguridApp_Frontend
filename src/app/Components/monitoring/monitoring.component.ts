import { Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  rute:String

  constructor( private location:Location) {
    this.rute = location.path()
    console.log(this.rute)
  }

  ngOnInit(): void {
  }

  locationSelected(rute:String) {
    switch (rute) {
      case "/monitoring/cochera":
        return NgClass['cl']
        break;
      case "/monitoring/sala":
        break;
      case "/monitoring/patio":
        break;
    
      default:
        break;
    }
  }

}
