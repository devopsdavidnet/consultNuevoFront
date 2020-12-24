/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                Fecha: 02/11/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona búsqueda de casos filtrados por código caso,  --
*-- nombre caso o número de file                                                 --
*----------------------------------------------------------------------------------
*/

import { Component, OnInit } from '@angular/core';
import { Caso} from '../../models/caso';
import { ServiceService } from '../../../services/service.service';
import { ListComponent } from '../../list/list.component';
import { MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogComponent } from '../../dialog/dialog.component';
import { PdfComponent } from '../../pdf/pdf.component';
import { FormControl, Validators} from '@angular/forms';
import { MatPaginator} from '@angular/material/paginator';
import { ViewChild} from '@angular/core';

@Component({

  selector: 'filtro-felcn',  
  templateUrl: './filtro-felcn.component.html',
  styleUrls: ['./filtro-felcn.component.css']
})
export class FiltroFelcnComponent implements OnInit {
  
  // Declaración de variables

  public loading:boolean;
  show: boolean = false;
  swCargando:boolean=false;
  numeroCasoFelcn = new FormControl('', [Validators.required]); 
  pg: number = 0; 
  mostrar: boolean=false;
  mensaje : string ='';  
  public displayedColumns = ['nroCasoFelcn', 'oficianaAperturaCaso','oficianaRecepcionBien','nroFile', 'nombreCaso','fechaRecepcion', 'fechaInicioContrato', 'tipoBien', 'categoria', 'dato', 'accion'];  
  public dataSource =new MatTableDataSource<Caso>();
  Caso$: Caso[];
  formulario={
  dato:"",
  oficina :"",
  numeroCasoFelcn:"",
  numerofile:"",
  nombreCasoFelcn:""
  } 
  swIconoPdf:boolean=true;
  list:ListComponent;

  // Funciones
  constructor(
    private router:Router,
    private service:ServiceService,
    public dialog:MatDialog,        
    ) {
      this.loading=true;
    }
 
  applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    
    
  ngOnInit() {   
    this.dataSource.paginator = this.paginator;
  }
  getErrorMessage() {
    return this.numeroCasoFelcn.hasError('required') ? 'Debe introducir un dato con mas tres caracteres' : '';
  }
  buscarCasoFelcn(nroCaso: string,nombreCaso:string, nroFile: string){
    
    if(nroCaso.length>=3 || nroFile.length>=1 || nombreCaso.length>=3){
    sessionStorage.setItem("pg", "0");
    this.pg=parseInt(sessionStorage.getItem("pg"));
    if(nroFile==undefined){
      nroFile="";
    
    }
    if(nroCaso==undefined){
      nroCaso="";
      this.swIconoPdf=false;
    }
    if(nombreCaso==undefined){
      nombreCaso="";
      
    }
   
    this.swCargando=true;  
    this.service.getCasos(nroCaso,nombreCaso,nroFile,this.pg).subscribe((result)=>{  
      if(result.length===0){          
        this.mensaje ="No se encontraron registros en la busqueda, intente de nuevo...";      
        this.swCargando=false;  
        }else{          
          this.mensaje =""; 
          this.mostrar=true;
             
        }
        this.swCargando=false;    
         this.dataSource.data  =  result as Caso[];     
    }, 
        error => console.log("errorr :"+error)
    );
   sessionStorage.setItem("pg", "0");
   sessionStorage.setItem("nroFile", nroFile); 
   sessionStorage.setItem("nombreCaso", nombreCaso);    
   sessionStorage.setItem("nroCaso", nroCaso);  
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
  }

  next(){
    this.pg=parseInt(sessionStorage.getItem("pg"));
    this.pg=this.pg+1;
    sessionStorage.setItem("pg", (this.pg).toString());    
    this.service.getCasos(sessionStorage.getItem("nroCaso"),sessionStorage.getItem("nombreCaso"), sessionStorage.getItem("nroFile"),this.pg).subscribe((result)=>{    
      this.dataSource.data  =  result as Caso[];
    })
  }
  previous(){
    this.pg=parseInt(sessionStorage.getItem("pg"));
    if(this.pg>0){
    this.pg=this.pg-1;
    this.service.getCasos(sessionStorage.getItem("nroCaso"),sessionStorage.getItem("nombreCaso"),sessionStorage.getItem("nroFile"),this.pg).subscribe((result)=>{    
      this.dataSource.data  =  result as Caso[];
    })
    sessionStorage.setItem("pg", (this.pg).toString());
    }
  } 


  openReport(codigo:any):void {    
    
    let url = this.router.createUrlTree(['pdf', codigo])
    window.open(url.toString(), '_blank')
  }
  onkeypress(codigo: string){
    
  }

  openInventario(codBien: string):void {
    const dialogRef=this.dialog.open(ListComponent,{
    width: '500px', height: '400px',
    data: codBien
    });
  }

}
