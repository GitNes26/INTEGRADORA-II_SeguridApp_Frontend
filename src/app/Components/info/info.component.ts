import { Component, OnInit } from '@angular/core';
import { User } from '../../Models/user';
import { Sensor } from '../../Models/sensor';
import { AuthService } from '../../Services/auth.service';
import { SensorService } from '../../Services/sensor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timeMessage, successDialog } from '../../../../../VERSION OBSOLETA/INTEGRADORA-II_SeguridApp_Frontend/src/app/Functions/Alerts';
import { Router } from '@angular/router';
import { ResultService } from '../../Services/result.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  user:User
  sensorArray:Sensor[] = []
  name:string
  last_name:string
  age:Number
  cel:string
  email:string
  // password:string
  formG:FormGroup

  updated = false

  constructor( private authService:AuthService, private sensorServce:SensorService, private formBuilder:FormBuilder, private resultService:ResultService) {
    this.show()
    this.buildForm()
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      name: [this.name, [Validators.required]],
      last_name: [this.last_name, [Validators.required]],
      age: [this.age, [Validators.required, Validators.min(18)]],
      cel: [this.cel, [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')]],
      email: [this.email, [Validators.required, Validators.email]],
      // pwd: [this.password, [Validators.required, Validators.minLength(3)]],
    })
  }
  validateTextField(tf:string) {
    return this.formG.get(tf).invalid && this.formG.get(tf).touched
  }
  validateErrorTextField(tf:string) {
    return this.formG.get(tf).errors && this.formG.get(tf).touched
  }

  show() {
    this.authService.show().subscribe((o:any) => {
      this.user = o
      this.name = this.user.name
      this.last_name = this.user.last_name
      this.age = this.user.age
      this.cel = this.user.cel
      this.email = this.user.email
      // this.password = "*****"
    })
    this.sensorServce.showMySensors().subscribe((o:any) => {
      this.sensorArray = o
    })
  }

  edit() {
    this.updated = true
    this.buildForm()
  }
  setData() {
    this.user = {
      name: this.formG.get('name').value,
      last_name: this.formG.get('last_name').value,
      age: this.formG.get('age').value,
      cel: this.formG.get('cel').value,
      email: this.formG.get('email').value,
      // password: this.formG.get('pwd').value
    }
  }
  update() {
    if (this.formG.valid) {
      this.setData()
      this.authService.update(this.user).subscribe(() => {
        timeMessage('Actualizando...',1500).then(() => {
          successDialog('Datos Actualizados')
          this.updated = true
          location.reload()
        })
      })
    }
  }
  notUpdated() { this.updated = false }

  deleteHistory() {
    this.resultService.deleteHistory().subscribe(() => {
      timeMessage('Borrando historial', 1500).then(() => {
        successDialog('Historial Vacio')
      })
    })
  }

}
