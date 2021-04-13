import { Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LocationModel } from '../../Models/locationModel';
import { LocationService } from '../../Services/location.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css']
})
export class MonitoringComponent implements OnInit {

  rute:String
  locationArray:LocationModel[] = []

  constructor( private serviceLocation:LocationService, private location:Location, private router:Router, private activatedRoute:ActivatedRoute) {
    this.showLocations()
    this.rute = location.path()
    console.log(this.rute)
  }

  ngOnInit(): void {
  }

  showLocations() {
    this.serviceLocation.showMyLocations().subscribe((o:any) => {
      this.locationArray = o
    })
  }

  locationSelected(location:String) {
    console.log('locationSelected():',location);
    // this.router.navigate([location])
    
  }

}
