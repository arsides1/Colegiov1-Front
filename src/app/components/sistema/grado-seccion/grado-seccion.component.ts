import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { switchMap } from 'rxjs/operators';
import { GradoSeccion } from '../models/grado-seccion';
import { GradoSeccionService } from '../services/grado-seccion.service';

import { GradoSeccionDialogoComponent } from './grado-seccion-dialogo/grado-seccion-dialogo.component';

@Component({
  selector: 'app-grado-seccion',
  templateUrl: './grado-seccion.component.html',
  styleUrls: ['./grado-seccion.component.css']
})
export class GradoSeccionComponent implements OnInit {
  dataSource!: MatTableDataSource<GradoSeccion>;
  displayedColumns = ['idGradoSeccion', 'descripcionGrado', 'descripcionSeccion', 'estado','acciones'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private gradoSeccionService: GradoSeccionService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.gradoSeccionService.gradoSeccionCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.gradoSeccionService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    this.gradoSeccionService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openDialog(gradoSeccion?: GradoSeccion) {
    let niv = gradoSeccion != null ? gradoSeccion : new GradoSeccion();

    this.dialog.open(GradoSeccionDialogoComponent, {
      width: '250px',
      data: niv
    });
  }

  eliminar(gradoSeccion: GradoSeccion) {

    this.gradoSeccionService.eliminar(gradoSeccion.idGradoSeccion).pipe(switchMap(() => {
      return this.gradoSeccionService.listar();
    })).subscribe(data => {
      this.gradoSeccionService.gradoSeccionCambio.next(data);
      this.gradoSeccionService.mensajeCambio.next("Se elimino");
    });
  }

}

