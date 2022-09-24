import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Periodo } from '../../models/periodo';
import { PeriodoService } from '../../services/periodo.service';


@Component({
  selector: 'app-editar-periodo',
  templateUrl: './editar-periodo.component.html',
  styleUrls: ['./editar-periodo.component.css']
})
export class EditarPeriodoComponent implements OnInit {
  form!: FormGroup;
  id!: number;
  edicion!: boolean;
  //estado!: boolean;
  minFecha: Date = new Date();
  minFecha2: Date = new Date();
  constructor(private route: ActivatedRoute,private router: Router,private periodoService: PeriodoService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'id': new FormControl(0),
      'descripcion': new FormControl(''),
      'fechaInicio': new FormControl(''),
      'fechaFin': new FormControl(''),
      'estado': new FormControl('')

    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });

  }

  initForm(){
    if(this.edicion){
      //cargar la data del servicio en el form
      this.periodoService.listarPorId(this.id).subscribe(data =>{
        console.log(data);
        let fecha1 = new Date(data.fechaInicio)
        let tzoffset = (fecha1).getTimezoneOffset() * 60000;
        let localISOTime = (new Date(fecha1.getTime() + tzoffset)).toISOString();
        let fechaInicio = new Date(localISOTime);

        let fecha2 = new Date(data.fechaFin)
        let tzoffset2 = (fecha2).getTimezoneOffset() * 60000;
        let localISOTime2 = (new Date(fecha2.getTime() + tzoffset2)).toISOString();
        let fechaFin = new Date(localISOTime2);
        //let estado!: boolean;
        this.form = new FormGroup({
          'id': new FormControl(data.idPeriodo),
          'descripcion': new FormControl(data.descripcion),
          'fechaInicio': new FormControl(fechaInicio),
          'fechaFin': new FormControl(fechaFin),
          'estado': new FormControl(data.estado)

        });

      });
    }

  }

  operar() {
    let periodo = new Periodo();
    periodo.idPeriodo = this.form.value['id'];
    periodo.descripcion = this.form.value['descripcion'];
    periodo.fechaInicio = this.form.value['fechaInicio'];
    periodo.fechaFin = this.form.value ['fechaFin'];
    periodo.estado = this.form.value['estado'];
    if(this.edicion){
      //servicio de edicion
      this.periodoService.modificar(periodo).subscribe(()=>{
        this.periodoService.listar().subscribe(data=>{
          this.periodoService.periodoCambio.next(data);
          this.periodoService.mensajeCambio.next('PERIODO MODIFICADO')
        });
      });
    }else{
      //servicio de registro
      this.periodoService.registrar(periodo).subscribe(()=>{
        this.periodoService.listar().subscribe(data=>{
          this.periodoService.periodoCambio.next(data);
          this.periodoService.mensajeCambio.next('PERIODO REGISTRADO')
        });
      });
    }
    this.router.navigate(['periodo'])
  }
}
