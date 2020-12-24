/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                               Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript  gestiona el funcionamiento de la pantalla de          --
*-- búsqueda de bienes adeudados                                                 -- 
*----------------------------------------------------------------------------------
*/

import { Component, OnInit } from '@angular/core';
import { FormControl, Validators} from '@angular/forms';
import { Caso} from '../../models/caso';
import { ServiceService} from '../../../services/service.service';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';
import { PdfComponent } from '../../pdf/pdf.component';
import * as moment from 'moment';
import { ListComponent } from '../../list/list.component';
import {EventEmitter, Input, Output} from "@angular/core";
import { MatRadioChange } from '@angular/material/radio';
import { MatRadioButton } from '@angular/material/radio';
import { objeto } from '../../models/objeto';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
export interface Oficina {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'filtro-bienes-adeudados',
  templateUrl: './filtro-bienes-adeudados.component.html',
  styleUrls: ['./filtro-bienes-adeudados.component.css']
})

export class FiltroBienesAdeudadosComponent implements OnInit{ 

  // declaración de variables
  dato = new FormControl('', [Validators.required]); 
  checked:string;
  mrButton: MatRadioButton; 
  swCargando:boolean=false;
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  pg: number = 0;  
  mostrar: boolean=false;
  mensaje : string ='';  
  public displayedColumns = ['nroCasoFelcn', 'oficianaAperturaCaso','oficianaRecepcionBien','nombreCaso', 'fechaInicioContrato', 'fechaFinalContrato','tipoBien', 'categoria','razonSocial', 'dato', 'accion'];  
  public dataSource =new MatTableDataSource<Caso>();
  @Input() value: any;
  @Input() disabled: boolean;
  Caso$: Caso[];
  oficinasCasos: objeto[];  
  formulario={
  dato:"",
  valor:"",
  fechaInicio:undefined,
  fechaFin:undefined,
  oficina :""
  }

  oficina: Oficina[] = [       
    {value: '1', viewValue: 'NACIONAL'},  
    {value: '2', viewValue: 'DISTRITAL LA PAZ'},
    {value: '3', viewValue: 'DISTRITAL COCHABAMBA'},
    {value: '4', viewValue: 'DISTRITAL SANTA CRUZ'},
    {value: '5', viewValue: 'DISTRITAL TARIJA'},
    {value: '6', viewValue: 'DISTRITAL ORURO'},
    {value: '7', viewValue: 'DISTRITAL PANDO'},
    {value: '8', viewValue: 'DISTRITAL BENI'},
    {value: '9', viewValue: 'DISTRITAL CHUQUISACA'},
    {value: '10', viewValue: 'DISTRITAL POTOSÍ'}
  ];
  
  // funciones
  constructor(private router:Router,private service:ServiceService,public dialog:MatDialog) { }

  ngOnInit() {    
    this.formulario.oficina=sessionStorage.getItem("idOficinaC");    
    this.checked="S";
    this.getOficinaCasos("1");
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  getErrorMessage() {
    return this.dato.hasError('required') ? 'Debe Introducir un valor' :        
            '';
  }
  getOficinaCasos(codigo:string){
    return this.service.getOficina(codigo).subscribe((data)=>this.oficinasCasos=data);         
  } 

  onChange(mrChange: MatRadioChange) {
    this.mrButton= mrChange.source;
    this.checked=mrChange.value;
  } 

  buscarAdeudado(flag: string, valor:string,idOficinaBien: string,fechaInicio:string,fechaFin:string){
    this.swCargando=true;
  sessionStorage.setItem("pg", "0");
  this.pg=parseInt(sessionStorage.getItem("pg"));
  if(idOficinaBien==""){
    idOficinaBien=this.formulario.oficina;
  } 
  
  if(fechaInicio==undefined){
    fechaInicio="";
  }else{
    fechaInicio=moment(fechaInicio).format("YYYY-MM-DD");  
  }
  if(fechaFin==undefined){
    fechaFin="";
  }else{
    fechaFin=moment(fechaFin).format("YYYY-MM-DD");  
  }

  if (flag ==='excel'){ 
    
    let src=this.service.jasperexcel_bien_adeudado(valor,fechaInicio,
      fechaFin,idOficinaBien,sessionStorage.getItem("idOficinaC"));   
      this.swCargando=false;  
      window.open(src,'_self');
     
  }
  else{
  this.service.getBienesAdeudados(valor,fechaInicio,
  fechaFin,this.checked,idOficinaBien,sessionStorage.getItem("idOficinaC"),this.pg).subscribe((result)=>{   
    this.swCargando=false;     
      if(result.length===0){   
      this.mensaje ="No se Encontraron registros en la Busqueda, intente de nuevo...";      
      }else{
        this.mensaje ="";  
        this.mostrar=true;
      } this.dataSource.data=result as Caso[];        
      },
        error => console.log("errorr :"+error)  
      );  
 
      sessionStorage.setItem("valorBien", valor);
      sessionStorage.setItem("fechaInicioBin", fechaInicio);
      sessionStorage.setItem("fechaFinBien", fechaFin);
      sessionStorage.setItem("vencido", this.checked);
      sessionStorage.setItem("idOficinaBien", idOficinaBien);
      sessionStorage.setItem("pg", "0");              
    }
  //}
 }
 openDialog(caso: Caso):void {
  const dialogRef=this.dialog.open(DialogComponent,{});
  
  sessionStorage.setItem("caso", JSON.stringify(caso));
}

openPdf(codBien: string):void {
  const dialogRef=this.dialog.open(PdfComponent,{
  width: '900px', height: '800px',
  data: codBien
});
//sessionStorage.setItem("caso", JSON.stringify(caso));
}

next(){
  this.pg=parseInt(sessionStorage.getItem("pg"));
  this.pg=this.pg+1;
  sessionStorage.setItem("pg", (this.pg).toString());
  
  this.service.getBienesAdeudados(sessionStorage.getItem("valorBien"),sessionStorage.getItem("fechaInicioBin"),sessionStorage.getItem("fechaFinBien"),sessionStorage.getItem("vencido"),sessionStorage.getItem("idOficinaBien"),sessionStorage.getItem("idOficinaC"),this.pg).subscribe((result)=>{
    this.dataSource.data  =  result as Caso[];       
    });
}
previous(){
  this.pg=parseInt(sessionStorage.getItem("pg"));
  if(this.pg>0){
  this.pg=this.pg-1;
  this.service.getBienesAdeudados(sessionStorage.getItem("valorBien"),sessionStorage.getItem("fechaInicioBin"),sessionStorage.getItem("fechaFinBien"),sessionStorage.getItem("vencido"),sessionStorage.getItem("idOficinaBien"),sessionStorage.getItem("idOficinaC"),this.pg).subscribe((result)=>{
    this.dataSource.data  =  result as Caso[];       
    });
  sessionStorage.setItem("pg", (this.pg).toString());
  }
} 

openInventario(codBien: string):void {
  const dialogRef=this.dialog.open(ListComponent,{
  width: '500px', height: '400px',
  data: codBien
  });
}

}

