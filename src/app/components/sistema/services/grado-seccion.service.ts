import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GradoSeccion } from '../models/grado-seccion';



@Injectable({
  providedIn: 'root'
})
export class GradoSeccionService {

  gradoSeccionCambio = new Subject<GradoSeccion[]>();
  mensajeCambio = new Subject<string>();
  url:string = `${environment.HOST}/Grado_Seccion`;
  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<GradoSeccion[]>(`${this.url}/listar`);
  }

  listarPorId(id : number){
    return this.http.get<GradoSeccion>(`${this.url}/buscar/${id}`);
  }

  registrar(gradoSeccion : GradoSeccion){
    return this.http.post(`${this.url}/agregar`, gradoSeccion);
  }

  modificar(gradoSeccion: GradoSeccion){
    return this.http.put(`${this.url}/actualizar`, gradoSeccion);
  }

  actualizar(id: number, data: GradoSeccion | null){
    return this.http.put<GradoSeccion>(`${this.url}/editar/${id}`,data);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/borrar/${id}`);
  }
}
