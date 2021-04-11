import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  i = 1;

  constructor( private router:Router) {}

  ngOnInit(): void {
  }

  goTo(page:string) {
    this.router.navigate([page])
  }

}
