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
  mySensor:Sensor
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

  constructor( private resultService:ResultService, private sensorService:SensorService) {
  }

  ngOnInit(): void {
    // this.ws = Ws('ws://127.0.0.1:3333', {
      // path: 'seguridapp' })
    this.ws = Ws('ws://cisco16.tk', {
      path:'seguridapp/?token='+localStorage.getItem('myToken')
    })
    this.ws.connect()
    this.temp()
    this.hum()
    this.pir()
    this.ultra()
  }

  temp() {
    this.channel = this.ws.subscribe('temperatura')
          
    this.channel.on('message',(d:any) => {
      this.tempSensor = d

      this.sensorService.showSensor('Temperatura').subscribe((dataSensor:any) =>{
        this.mySensor = dataSensor
        this.result = {
          sensor : this.mySensor._id,
          data : this.tempSensor
        }
        console.log(this.result);
        
        this.resultService.store(this.result).subscribe(() =>{
          console.log('dato temperatura guardado');
        })

      })

    })
  }
  hum() {
    this.channel = this.ws.subscribe('humedad') 
    
    this.channel.on('message',(d:any) => {
      this.humSensor = d

      this.sensorService.showSensor('Humedad').subscribe((dataSensor:any) =>{
        this.mySensor = dataSensor
        this.result = {
          sensor : this.mySensor._id,
          data : this.humSensor
        }
        console.log(this.result);
        
        this.resultService.store(this.result).subscribe(() =>{
          console.log('dato humedad guardado');
        })

      })

    })
  }
  pir() {
    this.channel = this.ws.subscribe('pir')
    
    this.channel.on('message',(data:any) => {
      this.value = data
      if (this.value == 1) { 
        this.motionDetected = true
        this.pirSensor = 'Hay Movimiento'}
      if (this.value == 0) { 
        this.motionDetected = false
        this.pirSensor = 'Área Segura'  }

      this.sensorService.showSensor('Movimiento').subscribe((dataSensor:any) =>{
        this.mySensor = dataSensor

        this.result = {
          sensor : this.mySensor._id,
          data : this.motionDetected
        }
        console.log(this.result);
        
        this.resultService.store(this.result).subscribe(() =>{
          console.log('dato pir guardado');
        })

      })
    })
  }
  ultra() {
    this.channel = this.ws.subscribe('ultrasonico')
    
    this.channel.on('message',(d:any) => {
      this.ultraSensor = d

      this.sensorService.showSensor('Distancia').subscribe((dataSensor:any) =>{
        this.mySensor = dataSensor

        this.result = {
          sensor : this.mySensor._id,
          data : this.ultraSensor
        }
        console.log(this.result);
        
        this.resultService.store(this.result).subscribe(() =>{
          console.log('dato ultrasonico guardado');
        })

      })

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
    this.resultService.humMax().subscribe((o:any) => {
      this.result = o[0]
      this.humMax = this.result.data
      toastN()
    })
    this.resultService.humMin().subscribe((o:any) => {
      this.result = o[0]
      this.humMin = this.result.data
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
