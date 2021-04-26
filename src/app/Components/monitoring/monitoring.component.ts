import { formatDate, Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorService } from '../../Services/sensor.service';
import { Sensor } from '../../Models/sensor';
import { successDialog, toastN } from '../../Functions/Alerts';
import { ResultService } from '../../Services/result.service';
import { Result } from '../../Models/result';
import { triggerBtnRefresh, triggerMotionDetected } from '../../Animations/animations';
import Ws from '@adonisjs/websocket-client'

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
  animations: [ triggerBtnRefresh, triggerMotionDetected ]
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

  clickRefresh = true
  motionDetected = false
  timeNow: number;
  now: string;

  constructor( private resultService:ResultService) {
  }

  ngOnInit(): void {
    // this.ws = Ws('ws://127.0.0.1:3333', {
    this.ws = Ws('ws://cisco16.tk', {
      path:'seguridapp/?token='+localStorage.getItem('myToken')
    })
    this.ws.connect()
    // this.connectSocket('tempData',this.tempSensor)
    // this.connectSocket('humData',this.humSensor)
    // this.connectSocket('pirData',this.pirSensor)
    // this.connectSocket('ultraData',this.ultraSensor)
    this.temp()
    this.hum()
    this.pir()
    this.ultra()

    // this.connectSocket('temperatura',this.tempSensor)
    // this.connectSocket('humedad',this.humSensor)
    // this.connectSocket('pir',this.pirSensor)
    // this.connectSocket('ultrasonico',this.ultraSensor)
  }

  connectSocket(topic:string, sensorValue) {
    this.channel = this.ws.subscribe(topic)
    
    this.channel.on('message',(data:any) => {
      sensorValue = data
    })
  }
  temp() {
    this.channel = this.ws.subscribe('temperatura')
    
    this.channel.on('message',(data:any) => {
      this.tempSensor = data
    })
  }
  hum() {
    this.channel = this.ws.subscribe('humedad')
    
    this.channel.on('message',(data:any) => {
      this.humSensor = data
    })
  }
  pir() {
    this.channel = this.ws.subscribe('pir')
    
    this.channel.on('message',(data:any) => {
      this.value = data
      if (this.value == true) { 
        this.motionDetected = true
        this.pirSensor = 'Hay Movimiento'}
      if (this.value == false) { 
        this.motionDetected = false
        this.pirSensor = 'Área Segura'  }
    })
  }
  ultra() {
    this.channel = this.ws.subscribe('ultrasonico')
    
    this.channel.on('message',(data:any) => {
      this.ultraSensor = data
    })
  }
  // ultra() {
  //   this.channel.emit('dataSensor', this.value)
  //   this.ultraSensor = this.value
  //   this.value = ""
  // }

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

  animateRefresh() {
    this.clickRefresh = !this.clickRefresh
    this.showQuerys()
    this.timeNow = Date.now()
    this.now = formatDate(this.timeNow, 'dd-MMMM-yy hh:mm:ss a','en-US', '+052-')    
  }
}
