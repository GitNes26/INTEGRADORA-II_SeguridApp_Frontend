import { Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorService } from '../../Services/sensor.service';
import { Sensor } from '../../Models/sensor';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  rute:String
  sensorArray:Sensor[] = []
  sensorsInit = false

  constructor( private serviceSensor:SensorService, private location:Location, private router:Router, private activatedRoute:ActivatedRoute) {
    this.showSensors()
    this.rute = location.path()
    console.log(this.rute)
  }

  ngOnInit(): void {
  }

  showSensors() {
    this.serviceSensor.showMySensors().subscribe((o:any) => {
      this.sensorArray = o
      if (this.sensorArray.length == 0) {
        this.sensorsInit = false
      } else {
        this.sensorsInit = true
      }
      console.log(this.sensorArray);
      
    })
  }

  

  locationSelected(location:String) {
    console.log('locationSelected():',location);
    // this.router.navigate([location])
    
  }

}
