import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { switchMap } from 'rxjs';
import { Nivel } from '../../models/nivel';
import { NivelService } from '../../services/nivel.service';

@Component({
  selector: 'app-editar-nivel-academico',
  templateUrl: './editar-nivel-academico.component.html',
  styleUrls: ['./editar-nivel-academico.component.css']
})
export class EditarNivelAcademicoComponent implements OnInit {
  nivel!: Nivel;

  constructor(public dialogRef: MatDialogRef<EditarNivelAcademicoComponent>, @Inject(MAT_DIALOG_DATA) public data: Nivel, private nivelService: NivelService) { }

  ngOnInit(): void {
    this.nivel = new Nivel();
    this.nivel.idNivel = this.data.idNivel;
    this.nivel.idPeriodo.descripcion = this.data.idPeriodo.descripcion;
    this.nivel.descripcionNivel = this.data.descripcionNivel;
    this.nivel.descpricionTurno = this.data.descpricionTurno;
    this.nivel.horaInicio = this.data.horaInicio;
    this.nivel.horaFin = this.data.horaFin;

  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.nivel != null && this.nivel.idNivel > 0) {
      //BUENA PRACTICA
      this.nivelService.modificar(this.nivel).pipe(switchMap(() => {
        return this.nivelService.listar();
      })).subscribe(niveles => {
        this.nivelService.nivelCambio.next(niveles);
        this.nivelService.mensajeCambio.next("SE MODIFICO");
      });
    } else {
      //MALA PRACTICA SUBSCRIBE DENTRO DE OTOR SUBSCRIBE
      this.nivelService.registrar(this.nivel).subscribe(() => {
        this.nivelService.listar().subscribe(niveles => {
          this.nivelService.nivelCambio.next(niveles);
          this.nivelService.mensajeCambio.next("SE REGISTRO");
        });
      });
    }
    this.dialogRef.close();
  }

}
