/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona los iconos de la aplicación                   --
*----------------------------------------------------------------------------------
*/

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'sirebi-web';
  constructor(
    private router:Router, 
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
    ){
    this.matIconRegistry.addSvgIcon("pdf", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/pdf.svg")); 
    this.matIconRegistry.addSvgIcon("kardex", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/kardex.svg")); 
    this.matIconRegistry.addSvgIcon("excel", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/excel_v.svg")); 
    this.matIconRegistry.addSvgIcon("descargar", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/download.svg")); 
    this.matIconRegistry.addSvgIcon("buscar", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/busqueda.svg")); 
    this.matIconRegistry.addSvgIcon("ver", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/look.svg")); 
    this.matIconRegistry.addSvgIcon("cancelar", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/cancelar.svg")); 
    this.matIconRegistry.addSvgIcon("cancel", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/cancel.svg")); 
    this.matIconRegistry.addSvgIcon("cerrar", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/cerrar.svg")); 
    this.matIconRegistry.addSvgIcon("guardar", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/guardar.svg")); 
    this.matIconRegistry.addSvgIcon("enter", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/adelante.svg")); 
    this.matIconRegistry.addSvgIcon("lock", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/lock.svg")); 
    this.matIconRegistry.addSvgIcon("contacts", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/contacts.svg")); 
    this.matIconRegistry.addSvgIcon("inventario", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/inventario.svg")); 
    this.matIconRegistry.addSvgIcon("more_vert", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/more_vert.svg"));  
    this.matIconRegistry.addSvgIcon("logout", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/logout.svg")); 
    this.matIconRegistry.addSvgIcon("perm_contact", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/perm_contact.svg")); 
    this.matIconRegistry.addSvgIcon("home", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/home.svg")); 
    this.matIconRegistry.addSvgIcon("menu", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/menu.svg")); 
    this.matIconRegistry.addSvgIcon("excel_color", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/excel_color.svg")); 
    this.matIconRegistry.addSvgIcon("file-pdf", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/file-pdf.svg")); 
    this.matIconRegistry.addSvgIcon("horse", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/horse.svg")); 
    this.matIconRegistry.addSvgIcon("joint", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/joint.svg")); 
    this.matIconRegistry.addSvgIcon("pistola", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/pistola.svg")); 
    this.matIconRegistry.addSvgIcon("car", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/car.svg")); 
    this.matIconRegistry.addSvgIcon("tv", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/tv.svg")); 
    this.matIconRegistry.addSvgIcon("money-bill-wave", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/money-bill-wave.svg")); 
    this.matIconRegistry.addSvgIcon("canadian-maple-leaf", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/canadian-maple-leaf.svg")); 
    this.matIconRegistry.addSvgIcon("cube", this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/cube.svg")); 
    
  }
  Listar(){
    
    this.router.navigate(["listar"]);

  }
}
