import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Periodo } from '../models/periodo';


@Injectable({
  providedIn: 'root'
})
export class PeriodoService {

  periodoCambio = new Subject<Periodo[]>();
  mensajeCambio = new Subject<string>();
   url:string = `${environment.HOST}/periodo`;
  constructor(private http : HttpClient) { }

  listar(){
    return this.http.get<Periodo[]>(`${this.url}/listar`);
  }

  listarPorId(id : number){
    return this.http.get<Periodo>(`${this.url}/buscar/${id}`);
  }

  registrar(periodo : Periodo){
    return this.http.post(`${this.url}/agregar`, periodo);
  }

  modificar(periodo: Periodo){
    return this.http.put(`${this.url}/actualizar`, periodo);
  }

  actualizar(id: number, data: Periodo | null){
    return this.http.put<Periodo>(`${this.url}/editar/${id}`,data);
  }
}
