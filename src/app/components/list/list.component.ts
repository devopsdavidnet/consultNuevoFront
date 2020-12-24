/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                Fecha: 02/09/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona las columnas de información de inventario     --
*-- por caso                                                                     --
*----------------------------------------------------------------------------------
*/

import { Component, OnInit, Input, Inject } from '@angular/core';
import { Inventario } from '../models/inventario';
import { ServiceService} from '../../services/service.service';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  inventario$: Inventario[];
  headElements = [ 'Descripcion','Detalle', 'Unidad'];
  @Input() name:string;
  constructor(private router:Router,
    public service: ServiceService,
    public dialogRef: MatDialogRef<ListComponent>,
    @Inject(MAT_DIALOG_DATA) public codigobien: string
  ) { }

  ngOnInit() {
    this.service.getinventarios_por_bien(this.codigobien).subscribe(data=>this.inventario$=data);    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
