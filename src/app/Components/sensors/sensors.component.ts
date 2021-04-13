import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sensor } from '../../Models/sensor';
import { SensorService } from '../../Services/sensor.service';
import { Router } from '@angular/router';
import { timeMessage, successDialog, errorMessage } from '../../Functions/Alerts';
import { LocationModel } from '../../Models/locationModel';
import { LocationService } from '../../Services/location.service';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
  styleUrls: ['./sensors.component.css']
})
export class SensorsComponent implements OnInit {

  formG: FormGroup
  updateDisabled = true 
  sensorArray:Sensor[] = []
  locationArray:LocationModel[] = []

  constructor( private formBuilder:FormBuilder, private service:SensorService, private serviceLocation:LocationService, private router:Router) {
    this.buildForm()
    this.show()
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.required]],
      pin: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]]
    })
  }

  validateErrorTextField(tf:string) {
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  validateTextField(tf:string) {
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }

  show() {
    this.service.showMySensors().subscribe((o:any) => {
      this.sensorArray = o
    })
    this.serviceLocation.showMyLocations().subscribe((o:any) => {
      this.locationArray = o
    })
  }

  selected: Sensor = new Sensor()

  create() {
    if (this.formG.valid) { // verifica las validaciones de los campos
        this.service.add(this.selected).subscribe(() => {
          timeMessage('Registrando Sensor...', 500).then(() => {
            successDialog('Sensor Registrado')
            this.show()
          })
        }, error => { 
          console.log(error)
          errorMessage('El sesnor ya esta registrado.') })      
      this.buildForm()
      this.selected = new Sensor()
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  showUpdate(sensor:Sensor) {
    this.selected = sensor
    this.updateDisabled = false
  }
  update() {
    this.service.update(this.selected).subscribe((o:any) => {
      successDialog('Datos Actualizados')
      this.show()
    }, error => {
      console.log(error);
      errorMessage('El sesnor ya esta registrado.')
    })
    this.updateDisabled = true
    this.buildForm()
    this.selected = new Sensor()
  }

  delete(sensor:Sensor) {
    successDialog('El sensor "'+sensor.name+'" ha sido eliminado.').then (() => {
      this.service.delete(sensor.id).subscribe(() => {
        this.show()
      })
    })
  }

}
