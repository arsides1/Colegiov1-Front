import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialModule } from './components/material/material.module';
import { GradoSeccionDialogoComponent } from './components/sistema/grado-seccion/grado-seccion-dialogo/grado-seccion-dialogo.component';
import { EditarNivelAcademicoComponent } from './components/sistema/nivel-academico/editar-nivel-academico/editar-nivel-academico.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
