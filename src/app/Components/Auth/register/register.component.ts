import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { errorMessage, successDialog, timeMessage } from '../../../Functions/Alerts';
import { User } from '../../../Models/user';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { SensorService } from '../../../Services/sensor.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formG:FormGroup
  user:User

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private sensorService:SensorService, private router:Router) {
    this.buildForm()
   }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      age: ['18', [Validators.required, Validators.min(18)]],
      cel: ['', [Validators.required, Validators.pattern('[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]')]],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(3)]],
      pwd2: ['', [Validators.required]],
    })
  }

  validateErrorTextField(tf:string) {
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  validateTextField(tf:string) {
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }
  get password2Validate(){
    const pass = this.formG.get('pwd').value
    const pass2 = this.formG.get('pwd2').value

    return pass === pass2 ? false : true
  }

  register() {
    if (this.formG.valid){ // verifica las validaciones de los campos
      // const data = this.formG.value; // console.log(data);
      this.setData()
      this.authService.register(this.user).subscribe((data:any) => {
        timeMessage('Registrando...',1500).then(() => {
        successDialog('Registro Completado')
        this.router.navigate(['/login'])
        })
      }, error => {
        console.log(error);
        errorMessage('Ha ocurrido un error')
      })
      
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  setData() {
    this.user = {
      name: this.formG.get('name').value,
      last_name: this.formG.get('last_name').value,
      age: this.formG.get('age').value,
      cel: this.formG.get('cel').value,
      email: this.formG.get('email').value,
      password: this.formG.get('pwd').value
    }
  }

}
