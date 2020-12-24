/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona el archivo pdf                                --
*----------------------------------------------------------------------------------
*/

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material';
import { ServiceService } from '../../services/service.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {  
  src: string;
  constructor( public service: ServiceService,
    public dialogRef: MatDialogRef<PdfComponent>,
    @Inject(MAT_DIALOG_DATA) public codigobien: string
  ) { }

  ngOnInit() {
    
    this.src= this.service.jasperpdf(this.codigobien);
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
