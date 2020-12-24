/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                               Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript muestra el detalle del caso de acuerdo a la categoria  -- 
*----------------------------------------------------------------------------------
*/

import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import {Caso} from '../models/caso';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  // declaración de variables   
  casos: Caso;
  constructor(public dialogRef:MatDialogRef<DialogComponent>,@Inject(MAT_DIALOG_DATA) public message: string) { }
  tipoBien: string;
  desModelo: string;
  invDato1: string;
  invDato2: string;
  invDato3: string;
  invDato4: string;

  // funciones
  ngOnInit() {
    let caso=sessionStorage.getItem("datos");     
    
     this.casos=JSON.parse(sessionStorage.getItem("caso"));
      if(this.casos.categoria =="INMUEBLES"){
        this.tipoBien="Zona / Barrio";  
        this.desModelo="Calle / Avenida";   
        this.invDato1="Numero Puerta";
        this.invDato2="Folio Real";
        this.invDato3="Latitud";
        this.invDato4="Longitud";
        
       }
       if(this.casos.categoria =="MEDIOS DE TRANSPORTE"){
        this.tipoBien="Marca";  
        this.desModelo="Modelo";   
        this.invDato1=" ";
        this.invDato2="Número de Chasis";
        this.invDato3="Estado";
        this.invDato4="";
        this.casos.longitud="";

       }
       if(this.casos.categoria =="EQUIPOS ELECTRONICOS"){
        this.tipoBien="Marca";  
        this.desModelo="Modelo";   
        this.invDato1="Color ";
        this.invDato2="Tipo de Sistema";
        this.invDato3="Estado";
        
       }
       
      if(this.casos.categoria =="VALORES"){
              this.tipoBien="Monto";
              this.desModelo="Moneda";

              this.invDato1=" ";
              this.casos.numeroPuerta="";
        this.invDato2="";
        this.casos.folioReal="";
        this.invDato3="";
        this.casos.latitud="";
        this.invDato4="";
        this.casos.longitud="";

        }
        if(this.casos.categoria =="SUSTANCIAS CONTROLADAS"){
          this.tipoBien="";  
          this.casos.tipoBien="";
          this.desModelo="";   
          this.casos.calleAvenida="";
          this.invDato1="";
          this.casos.numeroPuerta="";
          this.invDato2="";
          this.casos.folioReal="";
          this.invDato3="";
          this.casos.latitud="";
          this.invDato4=""; 
          this.casos.longitud="";
         } 

         if(this.casos.categoria =="SEMOVIENTES"){
          this.tipoBien="";  
          this.casos.tipoBien="";
          this.desModelo="";   
          this.casos.calleAvenida="";
          this.invDato1="";
          this.casos.numeroPuerta="";
          this.invDato2="";
          this.casos.folioReal="";
          this.invDato3="";
          this.casos.latitud="";
          this.invDato4=""; 
          this.casos.longitud="";
         } 
         
         if(this.casos.categoria =="ARMAS"){
          this.tipoBien="";  
          this.casos.tipoBien="";
          this.desModelo="";   
          this.casos.calleAvenida="";
          this.invDato1="";
          this.casos.numeroPuerta="";
          this.invDato2="";
          this.casos.folioReal="";
          this.invDato3="";
          this.casos.latitud="";
          this.invDato4=""; 
          this.casos.longitud="";
         } 
         if(this.casos.categoria =="OTROS BIENES"){
          this.tipoBien="";  
          this.casos.tipoBien="";
          this.desModelo="";   
          this.casos.calleAvenida="";
          this.invDato1="";
          this.casos.numeroPuerta="";
          this.invDato2="";
          this.casos.folioReal="";
          this.invDato3="";
          this.casos.latitud="";
          this.invDato4=""; 
          this.casos.longitud="";
         } 
        
     sessionStorage.removeItem("caso");
  }
  onClickNo(): void{
    this.dialogRef.close();
  }

}
