import { Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorService } from '../../Services/sensor.service';
import { Sensor } from '../../Models/sensor';
import { successDialog } from '../../Functions/Alerts';
import { ResultService } from '../../Services/result.service';
import { Result } from '../../Models/result';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { triggerBgToggle, triggerToggle } from '../../Animations/animations';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
  animations: [ triggerBgToggle, triggerToggle
    // trigger('bgToggle', [
    //   state('actived', style({
    //       backgroundColor: '#198754'
    //   })),
    //   state('desactived', style({
    //       backgroundColor: '#DC3545'
    //   })),
    //   transition('actived <=> desactived', [
    //       animate('0.6s cubic-bezier(.075, 0.82, 0.165, 1)')
    //   ])
    // ]),
    // trigger('toggle', [
    //   state('active', style({
    //       left: '60%',
    //   })),
    //   state('desactived', style({
    //       left: '5%',
    //   })),
    //   transition('actived <=> desactived', [
    //     animate('0.6s cubic-bezier(.075, 0.82, 0.165, 1)')
    //   ])
    // ])
  ]
})

export class MonitoringComponent implements OnInit {

  rute:String
  sensorArray:Sensor[] = []
  btnSensorsInit = false
  result:Result
  tempMax:number = 0
  tempMin:number = 0
  humMax:number = 0
  humMin:number = 0
  presenceCounter:number = 0

  toggleActived = true

  constructor( private serviceSensor:SensorService, private resultService:ResultService) {
    this.showSensors()
    this.showQuerys()
  }

  ngOnInit(): void {
  }

  showSensors() {
    this.serviceSensor.showMySensors().subscribe((o:any) => {
      this.sensorArray = o
      if (this.sensorArray.length == 0) {
        this.btnSensorsInit = false
      } else {
        this.btnSensorsInit = true
      }
      // console.log('showSensors',this.btnSensorsInit,this.sensorArray);
    })
  }

  showQuerys() {
    this.resultService.tempMax().subscribe((o:any) => {
      this.result = o[0]
      this.tempMax = this.result.data      
    })
    this.resultService.tempMin().subscribe((o:any) => {
      this.result = o[0]
      this.tempMin = this.result.data
    })
    this.resultService.presenceCounter().subscribe((o:any) => {
      this.presenceCounter = o[0].presencias
    })
  }

  sensorsInit() {
    this.serviceSensor.add().subscribe( (o:any) => {
      successDialog('Sensores Iniciados').then( () => {
        
      })
    })
  }

  animateToggle() {
    this.toggleActived = !this.toggleActived
  }

}
