import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path:'login', component: LoginComponent},
  //carga perezosa  solo va cargar los componentes que va usar el usuario
  {path: 'sistema', loadChildren:()=> import('./components/sistema/sistema.module').then(x => x.SistemaModule)},
  { path:'**', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
