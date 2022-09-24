import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Periodo } from '../models/periodo';
import { PeriodoService } from '../services/periodo.service';



@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {


  dataSource!: MatTableDataSource<Periodo>;
  displayedColumns =['idPeriodo', 'descripcion','fechaInicio','fechaFin','estado','fechaRegistro','acciones']
  periodo!: Periodo[];
  @ViewChild(MatPaginator,{static : true}) paginator!: MatPaginator;
  @ViewChild(MatSort,{static: true})sort!: MatSort;
  constructor(private periodoService : PeriodoService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    this.periodoService.periodoCambio.subscribe(data =>{
      console.log(data);

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.periodoService.mensajeCambio.subscribe(data =>{
      this.snackBar.open(data,'AVISO',{
        duration:2000
      });
    });


    this.periodoService.listar().subscribe(data =>{
      console.log(data);

      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

  }

}
