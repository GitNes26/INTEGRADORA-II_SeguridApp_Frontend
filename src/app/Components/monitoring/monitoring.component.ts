import { formatDate, Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorService } from '../../Services/sensor.service';
import { Sensor } from '../../Models/sensor';
import { successDialog, toastN } from '../../Functions/Alerts';
import { ResultService } from '../../Services/result.service';
import { Result } from '../../Models/result';
import { triggerBtnReload, triggerMotionDetected } from '../../Animations/animations';
import Ws from '@adonisjs/websocket-client'

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
  animations: [ triggerBtnReload, triggerMotionDetected ]
})

export class MonitoringComponent implements OnInit {

  rute:String
  sensorArray:Sensor[] = []
  ws:any
  channel:any
  value:any
  result:Result
  tempSensor:any = 0
  humSensor:any = 0
  pirSensor:any = 'Área Segura'
  ultraSensor:any = 0
  tempMax:number = 0
  tempMin:number = 0
  humMax:number = 0
  humMin:number = 0
  presenceCounter:number = 0

  clickReload = true
  motionWasDetected = false
  timeNow: number;
  now: string;

  constructor( private resultService:ResultService) {
    // this.showQuerys()
  }

  ngOnInit(): void {
    this.ws = Ws('ws://127.0.0.1:3333', {
      path:'seguridapp'
    })
    this.ws.connect()
    this.connectSocket('tempData',this.tempSensor)
    this.connectSocket('humData',this.humSensor)
    this.connectSocket('pirData',this.pirSensor)
    this.connectSocket('ultraData',this.ultraSensor)
  }
  connectSocket(topic:string, sensorValue) {
    this.channel = this.ws.subscribe(topic)
    
    this.channel.on('dataSensor',(data:any) => {
      sensorValue = data
    })
  }
  temp() {
    this.channel.emit('dataSensor', this.value)
    this.tempSensor = this.value
    this.value = ""
  }
  hum() {
    this.channel.emit('dataSensor', this.value)
    this.humSensor = this.value
    this.value = ""
  }
  pir() {
    this.channel.emit('dataSensor', this.value)
    if (this.value == true) { 
      this.motionWasDetected = true
      this.pirSensor = 'Hay Movimiento'}
    if (this.value == false) { 
      this.motionWasDetected = false
      this.pirSensor = 'Área Segura'  }
    this.value = ""
  }
  ultra() {
    this.channel.emit('dataSensor', this.value)
    this.ultraSensor = this.value
    this.value = ""
  }

  showQuerys() {
    this.resultService.tempMax().subscribe((o:any) => {
      this.result = o[0]
      this.tempMax = this.result.data
      toastN()
    })
    this.resultService.tempMin().subscribe((o:any) => {
      this.result = o[0]
      this.tempMin = this.result.data
      toastN()
    })
    this.resultService.presenceCounter().subscribe((o:any) => {
      this.presenceCounter = o[0].presencias
      toastN()
    })
  }

  animateToggle() {
    this.clickReload = !this.clickReload
    this.showQuerys()
    this.timeNow = Date.now()
    this.now = formatDate(this.timeNow, 'dd-MMMM-yy hh:mm:ss a','en-US', '+052-')    
  }
}
