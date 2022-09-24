
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  constructor(private fb: FormBuilder, private _snackBar: MatSnackBar, private router: Router) {
    
    this.form = this.fb.group({
      usuario:['',Validators.required],
      password:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  ingresar(){
    
    const usuario = this.form.value.usuario;
    const password = this.form.value.password;
    console.log("usuario");
    console.log("paswword");
    
    if(usuario == 'Arsides' && password == "admin123"){
      // Redireccionamos al dashboard
      this.fakeLoading();
      console.log("Si entro")
    }else{
      // Mostramos el mensaje de error
      this.error();
      this.form.reset();
      console.error("No entro")
    }

  }

  error(){
    this._snackBar.open('Usuario o contraseña son incorrectos','Error',{
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }

  fakeLoading(){
    this.loading = true;
    setTimeout(()=>{
    this.router.navigate(['sistema']);
    },1500);
  }

  
  


}
