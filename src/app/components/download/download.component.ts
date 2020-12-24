/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                               Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona las descargas de los diferentes formatos de   --
*-- archivos                                                                     -- 
*----------------------------------------------------------------------------------
*/

import { Component, OnInit, Input} from '@angular/core';
import { ServiceService } from '../../services/service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css']  
})

export class DownloadComponent implements OnInit {

  //declaración de variables
  codigobien: string;  
  private sub: any;
  @Input() codbien: string;  
  @Input('archivo') archivo: string; 
  @Input('nrocaso') nrocaso: string; 
  @Input('nombreCaso') nombreCaso: string; 
  @Input('nrofile') nrofile: string; 
  codofi: string;   
  src : string;
  urldownload: string;
  usuario: string;
  password: string;
  formato: string;
  arhivo:string;
  servidor:string;

  // funciones
  constructor(private service:ServiceService, private sanitizer: DomSanitizer,private route: ActivatedRoute) { }
    
  ngOnInit() {          
  }

  download_settings_excel(){
    this.servidor='//192.168.9.81:8080'
    this.usuario='consulta';
    this.password='consulta';    
    this.arhivo ='rep_caso_tabla.xlsx';
    this.codofi=sessionStorage.getItem("idOficina");
    this.urldownload =this.servidor    
    +'/jasperserver/rest_v2/reports/reports/dircabi/'+this.arhivo
    +'?j_username='+this.usuario+'&j_password='+this.usuario
    +'&pa_caso='+this.nrocaso+'&pa_codoficina='+this.codofi;        
  };

  openUrl(): void {  
    if(this.nrocaso==undefined){
      this.nrocaso="";
    }
    if(this.nrofile==undefined){
      this.nrofile="";
    }  
    if(this.nombreCaso==undefined){
      this.nombreCaso="";
    }  

    // Descarga en excel
    if (this.archivo === 'pdf'){
      this.src= this.service.jasperPdfMasivo(this.nrocaso.trim());
      } 
    // Descarga el pdf
      if (this.archivo === 'descargar'){
      this.src= this.service.jasperpdf(this.codbien);
      }// Descarga en excel
      if (this.archivo === 'excel'){
        this.src= this.service.jasperexcel_felcn(this.nrocaso,this.nombreCaso, this.nrofile); 
        
        }
      window.open(this.src,'_self')
  }
 
  credenciales1jasper(codbien:string){
    this.src= this.service.jasperpdf(codbien)
  }
  
  printPage() {

    var pdfUrl = URL.createObjectURL('http://192.168.9.80:8080/sirebi-api/rest/app/pdf/SC-SCZ-01/001-SC-SCZ-01-0114/2018/1/1');
        var printwWindow = window.open(pdfUrl);
        printwWindow.print();

  }
  
}
