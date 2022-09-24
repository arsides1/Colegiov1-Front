import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { GradoSeccion } from '../../models/grado-seccion';
import { GradoSeccionService } from '../../services/grado-seccion.service';

@Component({
  selector: 'app-grado-seccion-dialogo',
  templateUrl: './grado-seccion-dialogo.component.html',
  styleUrls: ['./grado-seccion-dialogo.component.css']
})
export class GradoSeccionDialogoComponent implements OnInit {
  gradoSeccion!: GradoSeccion;
  constructor(public dialogRef: MatDialogRef<GradoSeccionDialogoComponent>, @Inject(MAT_DIALOG_DATA) public data: GradoSeccion, private gradoSeccionService: GradoSeccionService) { }

  ngOnInit(): void {
    this.gradoSeccion = new GradoSeccion();
    this.gradoSeccion.idGradoSeccion = this.data.idGradoSeccion;
    this.gradoSeccion.descripcionGrado = this.data.descripcionGrado;
    this.gradoSeccion.descripcionSeccion = this.data.descripcionSeccion;
    this.gradoSeccion.estado = this.data.estado;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.gradoSeccion != null && this.gradoSeccion.idGradoSeccion > 0) {
      //BUENA PRACTICA
      this.gradoSeccionService.modificar(this.gradoSeccion).pipe(switchMap(() => {
        return this.gradoSeccionService.listar();
      })).subscribe(niveles => {
        this.gradoSeccionService.gradoSeccionCambio.next(niveles);
        this.gradoSeccionService.mensajeCambio.next("SE MODIFICO");
      });
    } else {
      //MALA PRACTICA SUBSCRIBE DENTRO DE OTOR SUBSCRIBE
      this.gradoSeccionService.registrar(this.gradoSeccion).subscribe(() => {
        this.gradoSeccionService.listar().subscribe(niveles => {
          this.gradoSeccionService.gradoSeccionCambio.next(niveles);
          this.gradoSeccionService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

}
