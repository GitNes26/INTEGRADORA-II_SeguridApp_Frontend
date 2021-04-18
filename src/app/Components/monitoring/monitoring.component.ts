import { Location, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorService } from '../../Services/sensor.service';
import { Sensor } from '../../Models/sensor';
import { successDialog } from '../../Functions/Alerts';
import { ResultService } from '../../Services/result.service';
import { Result } from '../../Models/result';
import { triggerBgToggle, triggerToggle } from '../../Animations/animations';
import Ws from '@adonisjs/websocket-client'

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.css'],
  animations: [ triggerBgToggle, triggerToggle ]
})

export class MonitoringComponent implements OnInit {

  rute:String
  sensorArray:Sensor[] = []
  // btnSensorsInit = false
  ws:any
  channel:any
  value:any
  result:Result
  tempSensor:any
  humSensor:any
  pirSensor:any
  ultraSensor:any
  tempMax:number = 0
  tempMin:number = 0
  humMax:number = 0
  humMin:number = 0
  presenceCounter:number = 0

  toggleActived = true

  constructor( private serviceSensor:SensorService, private resultService:ResultService) {
    this.showQuerys()
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
    if (this.value == true) { this.pirSensor = 'Hay Movimiento'}
    if (this.value == false) { this.pirSensor = 'Área Segura'  }
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
