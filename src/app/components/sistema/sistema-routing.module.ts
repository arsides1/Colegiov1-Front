import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GradoSeccionComponent } from './grado-seccion/grado-seccion.component';
import { InicioComponent } from './inicio/inicio.component';
import { NivelAcademicoComponent } from './nivel-academico/nivel-academico.component';
import { EditarPeriodoComponent } from './periodo/editar-periodo/editar-periodo.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { SistemaComponent } from './sistema.component';

const routes: Routes = [
  {path: '', component: SistemaComponent},
  {path: '',component:InicioComponent, children:[
    {
      path: 'periodo',
      component: PeriodoComponent,
      children: [
        { path: 'nuevo', component: EditarPeriodoComponent },
        { path: 'edicion/:id', component: EditarPeriodoComponent },
      ],
    },
    {path: 'nivel-academico',component: NivelAcademicoComponent},
    {path: 'grado-seccion', component: GradoSeccionComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SistemaRoutingModule { }
