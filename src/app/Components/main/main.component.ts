import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from '../../Services/location.service';
import { LocationModel } from '../../Models/locationModel';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  locationArray:LocationModel[] = []
  location:LocationModel

  constructor( private serviceLocation:LocationService, private router:Router) {
    this.FirstLocation()
  }

  ngOnInit(): void {
  }

  goTo(page:string) {
    if (page == 'monitoring/') {
      this.router.navigate([page+this.location.name])
    } else { this.router.navigate([page]) }
  }

  FirstLocation() {
    this.serviceLocation.showMyLocations().subscribe((o:any) => {
      this.locationArray = o
      this.location = this.locationArray[0]
    })
  }

}
