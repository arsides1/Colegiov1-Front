import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { MaterialModule } from '../material/material.module';
import { SistemaComponent } from './sistema.component';


import { InicioComponent } from './inicio/inicio.component';
import { GradoSeccionComponent } from './grado-seccion/grado-seccion.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { NivelAcademicoComponent } from './nivel-academico/nivel-academico.component';
import { EditarPeriodoComponent } from './periodo/editar-periodo/editar-periodo.component';
import { PruebaComponent } from './grado-seccion/prueba/prueba.component';
import { EditarNivelAcademicoComponent } from './nivel-academico/editar-nivel-academico/editar-nivel-academico.component';
import { GradoSeccionDialogoComponent } from './grado-seccion/grado-seccion-dialogo/grado-seccion-dialogo.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';




@NgModule({
  declarations: [
    SistemaComponent,
    GradoSeccionComponent,
    PeriodoComponent,
    InicioComponent,
    NivelAcademicoComponent,
    PeriodoComponent,
    EditarPeriodoComponent,
    PruebaComponent,
    GradoSeccionDialogoComponent,
    EditarNivelAcademicoComponent
  ],
  entryComponents:[EditarNivelAcademicoComponent,GradoSeccionDialogoComponent],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    MaterialModule,
    FormsModule,
    MatDialogModule
  ]
})
export class SistemaModule { }
