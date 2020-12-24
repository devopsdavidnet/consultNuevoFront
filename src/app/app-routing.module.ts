/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                  Fecha: 03/08/2020          --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript donde se registran las rutas del Módulo de Consulta    --
*-- de Bienes para facilitar la navegación.                                      -- 
*----------------------------------------------------------------------------------
*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import { FiltroBienesComponent} from './components/forms/filtro-bienes/filtro-bienes.component';
import { FiltroBienesCategoriaComponent} from './components/forms/filtro-bienes-categoria/filtro-bienes-categoria.component';
import { FiltroFelcnComponent } from './components/forms/filtro-felcn/filtro-felcn.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido/bienvenido.component';
import { FiltroInventarioComponent } from './components/forms/filtro-inventario/filtro-inventario.component';
import { FiltroImplicadosComponent } from './components/forms/filtro-implicados/filtro-implicados.component';
import { FiltroBienesAdeudadosComponent } from './components/forms/filtro-bienes-adeudados/filtro-bienes-adeudados.component';
import { DownloadComponent } from './components/download/download.component';
import { DatosPersonalesComponent } from './components/forms/datos-personales/datos-personales.component';

const routes: Routes = [
 {path:'',component:BienvenidoComponent},
 {path:'bienvenido', component:BienvenidoComponent},
 {path:'filtroBienCategoria/:id', component:FiltroBienesCategoriaComponent},
 //{path:'filtroBien', component:FiltroBienesComponent},
 {path:'filtroImplicado',component:FiltroImplicadosComponent},
 {path:'filtroInventario',component:FiltroInventarioComponent},
 {path:'filtroFelcn',component:FiltroFelcnComponent},
 {path:'filtroBienAdeudado',component:FiltroBienesAdeudadosComponent},
 {path:'DatosPersonales',component:DatosPersonalesComponent}, 
 {path:'pdf/:codigo',component:DownloadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
