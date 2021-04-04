import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from '../../../Models/user';
import { AuthService } from '../../../Services/auth.service';
import { Router } from '@angular/router';
import { errorMessage, successDialog, timeMessage } from 'src/app/Functions/Alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formG:FormGroup
  user:User

  constructor(private formBuilder:FormBuilder, private authService:AuthService, private router:Router) {
    this.buildForm()
   }

  ngOnInit(): void {
  }

  private buildForm() {
    this.formG = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required]]
    })
  }

  validateErrorTextField(tf:string) {
    return (this.formG.get(tf).errors && this.formG.get(tf).touched)
  }

  validateTextField(tf:string) {
    return (this.formG.get(tf).invalid && this.formG.get(tf).touched)
  }

  login() {
    if (this.formG.valid){ // verifica las validaciones de los campos
      this.setData()
      this.authService.login(this.user).subscribe((data:any) => {
        timeMessage('Iniciando...', 1500).then(() => {
          successDialog('Bienvenido').then(() => {
            localStorage.setItem("myToken",data.token)
            localStorage.setItem("email",this.user.email)
            console.log('dentro del metodo login de login', localStorage)
            this.router.navigate(['/main'])
          })
        })
      }, error => {
        console.log(error)
        errorMessage('Credenciales incorrectas')
      })
    } else { // si no ha sido tocado ningun campo, marcar como tocado para arrojar errores
      this.formG.markAllAsTouched()
    }
  }

  setData() {
    this.user = {
      id: 0,
      name: '',
      last_name: '',
      age: 0,
      cel: 0,
      email: this.formG.get('email').value,
      password: this.formG.get('pwd').value,
    }
  }

}
