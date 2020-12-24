/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                Fecha: 02/09/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona búsqueda de casos por caracteristica del      --
*-- inventario                                                                   --
*----------------------------------------------------------------------------------
*/

import { Component, OnInit } from '@angular/core';
import { Caso} from '../../models/caso';
import { FormControl, Validators} from '@angular/forms';
import { ServiceService} from '../../../services/service.service';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { PdfComponent } from '../../pdf/pdf.component';
import { ListComponent} from '../../list/list.component';
import { DialogComponent} from '../../dialog/dialog.component';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
@Component({
  selector: 'filtro-inventario',
  templateUrl: './filtro-inventario.component.html',
  styleUrls: ['./filtro-inventario.component.css']
})

export class FiltroInventarioComponent implements OnInit {  
  
  // Declaración de variables
  dato = new FormControl('', [Validators.required]); 
  public displayedColumns = ['nroCasoFelcn', 'oficianaAperturaCaso','oficianaRecepcionBien','fechaRecepcion', 'nombreCaso', 'dato', 'tipoBien', 'subcategoria', 'categoria', 'accion'];  
  public dataSource =new MatTableDataSource<Caso>();
  mensaje : string =''; 
  swCargando:boolean=false;
  mostrar: boolean=false; 
  //src : SafeHtml;
  Caso$: Caso[];
  formulario={
  dato:""
  }
  pg: number = 0;
  
  // Funciones
  constructor(private router:Router,private service:ServiceService,public dialog:MatDialog, private domSanitizer: DomSanitizer) { }  

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getErrorMessage() {
    return this.dato.hasError('required') ? 'Debe Introducir un valor' :        
            '';
  }

buscarInventario(flag: string,dato: string){    
  
  if(dato.length>=2){
    this.swCargando=true;
    sessionStorage.setItem("pg", "0");
    this.pg=parseInt(sessionStorage.getItem("pg"));
    sessionStorage.setItem("valorInv", dato);
  if (flag ==='excel'){ 
  
    //this.src=this.domSanitizer.bypassSecurityTrustUrl(this.service.jasperexcel_inventario(dato)); 
    let src=this.service.jasperexcel_inventario(dato); 
  //src.replace(/\s+/g, ' ')    
  this.swCargando=false;
    window.open(src,'_self');
  }
  else{
    this.service.getCasosInventario(dato,this.pg).subscribe((result)=>{ 
      this.swCargando=false;
      if(result.length===0){   
        this.mensaje ="No se Encontraron registros en la Busqueda, intente de nuevo...";      
        }else{
          this.mensaje ="";  
          this.mostrar=true;
        }   this.dataSource.data  =  result as Caso[];    
        },
          error => console.log("errorr :"+error)  
        );       
  sessionStorage.setItem("pg", "0");  
  }
}
}  
  
  next(){
    this.pg=parseInt(sessionStorage.getItem("pg"));
    this.pg=this.pg+1;
    sessionStorage.setItem("pg", (this.pg).toString());
    
    this.service.getCasosInventario(sessionStorage.getItem("valorInv"),this.pg).subscribe((result)=>{    
      this.dataSource.data  =  result as Caso[];
    })
  }
  previous(){
    this.pg=parseInt(sessionStorage.getItem("pg"));
    if(this.pg>0){
    this.pg=this.pg-1;
    this.service.getCasosInventario(sessionStorage.getItem("valorInv"),this.pg).subscribe((result)=>{    
      this.dataSource.data  =  result as Caso[];
    })
    sessionStorage.setItem("pg", (this.pg).toString());
    }
  } 
  openDialog(caso: Caso):void {
    this.dialog.open(DialogComponent,{});    
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
