/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                Fecha: 02/09/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona búsqueda de casos filtrados por nombre        --
*-- implicado y tipo                                                             --
*----------------------------------------------------------------------------------
*/

import { Component, OnInit } from '@angular/core';
import { Caso} from '../../models/caso';
import { ServiceService} from '../../../services/service.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { MatDialog} from '@angular/material';
import { DialogComponent} from '../../dialog/dialog.component';
import { PdfComponent } from '../../pdf/pdf.component';
import { FormControl, Validators} from '@angular/forms';
import { ListComponent } from '../../list/list.component';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
export interface Implicado {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'filtro-implicados',
  templateUrl: './filtro-implicados.component.html',
  styleUrls: ['./filtro-implicados.component.css']
})
export class FiltroImplicadosComponent implements OnInit {    

  // Declaración de variables
  public displayedColumns = ['nroCasoFelcn','oficianaAperturaCaso','oficianaRecepcionBien', 'nombreCaso', 'tipoBien', 'categoria', 'dato', 'accion'];  
  public dataSource =new MatTableDataSource<Caso>();
  dato = new FormControl('', [Validators.required]); 
  mensaje : string ='';
  swCargando:boolean=false;  
  mostrar:boolean=false;
  Caso$: Caso[];
  formulario={
  dato:"",
  implicado:"0"
  }
  pg: number = 0;
  implicados: Implicado[] = [
    {value: '0', viewValue: 'TODOS'},    
    {value: '1', viewValue: 'AFECTADO'},  
    {value: '2', viewValue: 'FISCAL'},
    {value: '3', viewValue: 'IMP. PRINCIPAL'},
    {value: '4', viewValue: 'INSP. DE BIENES'},
    {value: '5', viewValue: 'INSP. DE JUZGADOS'},
    {value: '6', viewValue: 'JUEZ'},
    {value: '7', viewValue: 'POL ASIG AL CASO'},
    {value: '8', viewValue: 'JEFE DISTRITAL'}
  ];

  
  // Funciones

  constructor(private router:Router,private service:ServiceService,public dialog:MatDialog) { }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator; 
  }

  getErrorMessage() {
    return this.dato.hasError('required') ? 'Debe Introducir un valor' :        
            '';
  }


  buscarImplicado(flag: string, dato: string, implicado: string){ 
    
   if(dato.length>=2) {
    this.swCargando=true; 
    sessionStorage.setItem("pg", "0");
    this.pg=parseInt(sessionStorage.getItem("pg"));
    
    if (flag ==='excel'){ 
      let src=this.service.jasperexcel_implicado(dato,implicado); 
      
      this.swCargando=false; 
      window.open(src,'_self');
    }
    
    else{
    this.service.getCasosImplicado(dato,implicado,this.pg).subscribe((result)=>{
      this.swCargando=false; 
      if(result.length==0){
        this.mensaje ="No se encontraron registros en la Busqueda, intente nuevamente...";        
      }else{
      this.mensaje="";
       this.mostrar=true;
      }
      this.dataSource.data  =  result as Caso[];
    })
    sessionStorage.setItem("datoImp", dato);
    sessionStorage.setItem("implicadoImp", implicado);
    sessionStorage.setItem("pg", "0");  
  } 
}
}

  next(){
    this.pg=parseInt(sessionStorage.getItem("pg"));
    this.pg=this.pg+1;
    sessionStorage.setItem("pg", (this.pg).toString());
    
    this.service.getCasosImplicado(sessionStorage.getItem("datoImp"),sessionStorage.getItem("implicadoImp"),this.pg).subscribe((result)=>{    
      this.dataSource.data  =  result as Caso[];
    })
  }
  previous(){
    this.pg=parseInt(sessionStorage.getItem("pg"));
    if(this.pg>0){
    this.pg=this.pg-1;
    this.service.getCasosImplicado(sessionStorage.getItem("datoImp"),sessionStorage.getItem("implicadoImp"),this.pg).subscribe((result)=>{    
      this.dataSource.data  =  result as Caso[];
    })
    sessionStorage.setItem("pg", (this.pg).toString());
    }
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

  openInventario(codBien: string):void {
    const dialogRef=this.dialog.open(ListComponent,{
    width: '500px', height: '400px',
    data: codBien
    });
  }
}
