import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LocationModel } from '../../Models/locationModel';
import { LocationService } from '../../Services/location.service';
import { Router } from '@angular/router';
import { timeMessage, successDialog, errorMessage } from '../../Functions/Alerts';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  formG: FormGroup
  updateDisabled = true
  locationArray:LocationModel[] = []

  constructor( private formBuilder:FormBuilder, private service:LocationService, private router:Router) {
    this.buildForm()
    this.show()
  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      name: ['', [Validators.required]]
    })
  }

  validateErrorTextField(tf:string) {
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  validateTextField(tf:string) {
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }

  show() {
    this.service.showMyLocations().subscribe((o:any) => {
      this.locationArray = o
    })
  }

  selected:LocationModel = new LocationModel()

  create() {
    if (this.formG.valid) {
      this.service.add(this.selected).subscribe(() => {
        timeMessage('Registrando Locación...', 500).then(() => {
          successDialog('Locación Registrada')
          this.show()
        })
      }, error => { 
        console.log(error)
        errorMessage('Locación ya registrada')})
      this.buildForm()
      this.selected = new LocationModel()
    } else {
      this.formG.markAllAsTouched()
    }
  }

  showUpdate(location:LocationModel) {
    this.selected = location
    this.updateDisabled = false
  }
  update() {
    this.service.update(this.selected).subscribe(() => {
      successDialog('Datos Actualizados')
      this.show()
    }, error => { 
      console.log(error)
      errorMessage('La locación ya esta registrada.')})
    this.updateDisabled = true
    this.buildForm()
    this.selected = new LocationModel()
  }

  delete(location:LocationModel) {
    successDialog('La Locación "'+location.name+'" ha sido eliminada.').then (() => {
      this.service.delete(location.name).subscribe(() => {
        this.show()
      })
    })
  }

}
