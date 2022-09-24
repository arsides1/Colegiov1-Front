import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { Nivel } from '../models/nivel';
import { NivelService } from '../services/nivel.service';

import { EditarNivelAcademicoComponent } from './editar-nivel-academico/editar-nivel-academico.component';

@Component({
  selector: 'app-nivel-academico',
  templateUrl: './nivel-academico.component.html',
  styleUrls: ['./nivel-academico.component.css']
})
export class NivelAcademicoComponent implements OnInit {

  dataSource!: MatTableDataSource<Nivel>;
  displayedColumns = ['idNivel', 'idPeriodo', 'descripcionNivel', 'descpricionTurno', 'horaInicio','horaFin','acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private nivelService: NivelService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.nivelService.nivelCambio.subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });

  this.nivelService.mensajeCambio.subscribe(data => {
    this.snackBar.open(data, 'AVISO', {
      duration: 2000
    });
  });

  this.nivelService.listar().subscribe(data => {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

openDialog(nivel?: Nivel) {
  let niv = nivel != null ? nivel : new Nivel();

  this.dialog.open(EditarNivelAcademicoComponent, {
    width: '250px',
    data: niv
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}



applyFilters(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}
eliminar(nivel: Nivel) {

  this.nivelService.eliminar(nivel.idNivel).pipe(switchMap(() => {
    return this.nivelService.listar();
  })).subscribe(data => {
    this.nivelService.nivelCambio.next(data);
    this.nivelService.mensajeCambio.next("Se elimino");
  });
}

}
