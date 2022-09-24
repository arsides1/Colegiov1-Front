import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Nivel } from '../models/nivel';


@Injectable({
  providedIn: 'root'
})
export class NivelService {


  nivelCambio = new Subject<Nivel[]>();
  mensajeCambio = new Subject<string>();
   url:string = `${environment.HOST}/nivel`;
  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Nivel[]>(`${this.url}/listar`);
  }

  listarPorId(id : number){
    return this.http.get<Nivel>(`${this.url}/buscar/${id}`);
  }

  registrar(nivel : Nivel){
    return this.http.post(`${this.url}/agregar`, nivel);
  }

  modificar(nivel: Nivel){
    return this.http.put(`${this.url}/actualizar`, nivel);
  }

  actualizar(id: number, data: Nivel | null){
    return this.http.put<Nivel>(`${this.url}/editar/${id}`,data);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/borrar/${id}`);
  }
}
