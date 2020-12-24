/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript del menu de navegación gestiona las url's de navegación--
*----------------------------------------------------------------------------------
*/

import { Component, Output, EventEmitter, NgZone, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navegacion',
  templateUrl: './navegacion.component.html',
  styleUrls: ['./navegacion.component.css']
})
export class NavegacionComponent {
    usuario:string;
    oficina:string;
    notify$ = new Subject();
    public isOpenUiElements = true;
	
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
   @Output() islogged = new EventEmitter<boolean>()
  constructor(private breakpointObserver: BreakpointObserver, private zone: NgZone,private router:Router) {
    sessionStorage.setItem('expiredDate', addMinutes(new Date(), 15).getTime().toString());
    this.zone.runOutsideAngular(() => {

      const i = setInterval(() => {        
        const expiredDate = +sessionStorage.getItem('expiredDate');
        if (new Date().getTime() - expiredDate > 0) {
          this.zone.run(() => {
            this.notify$.next();
          })
          clearInterval(i);          
        };
      }, 1000)
    })
  }
  
  ngOnInit() {
    this.oficina=sessionStorage.getItem("oficina");
    this.usuario=sessionStorage.getItem("usuario");
    this.notify$.subscribe(() => {
      sessionStorage.clear();    
      this.MandarIslogged(false);
    })
  }
  
  MandarIslogged(flag:boolean){    
      this.islogged.emit(flag);
   }

  public openUiElements() {
    this.isOpenUiElements = !this.isOpenUiElements;
    console.log(this.isOpenUiElements);
  }

  public redireccionar(id_categoria:number){
    //alert(id_categoria);
    this.router.navigate(['filtroBienCategoria/'+id_categoria]);
  }

}

export function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}