/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                  Fecha: 03/08/2020         --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript donde se incluye los módulos de la librería Angular    --
*-- Material que se utilizarán en el desarrollo del Módulo de Consultas de Bienes--
*----------------------------------------------------------------------------------
*/

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FiltroFelcnComponent } from './components/forms/filtro-felcn/filtro-felcn.component';
//import { FiltroBienesComponent } from './components/forms/filtro-bienes/filtro-bienes.component';
import { FiltroInventarioComponent } from './components/forms/filtro-inventario/filtro-inventario.component';
import { FiltroImplicadosComponent } from './components/forms/filtro-implicados/filtro-implicados.component';
import { FiltroBienesAdeudadosComponent } from './components/forms/filtro-bienes-adeudados/filtro-bienes-adeudados.component';
import { ListComponent } from './components/list/list.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ServiceService } from './services/service.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DownloadComponent} from './components/download/download.component';
import { platformBrowserDynamic} from '@angular/platform-browser-dynamic';

// Material Imports
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule,  
  
  MAT_DATE_LOCALE
  } from '@angular/material';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { LayoutModule } from '@angular/cdk/layout';
import { DialogComponent } from './components/dialog/dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfComponent } from './components/pdf/pdf.component';
import { DatosPersonalesComponent } from './components/forms/datos-personales/datos-personales.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido/bienvenido.component';
import { FiltroBienesCategoriaComponent } from './components/forms/filtro-bienes-categoria/filtro-bienes-categoria.component';


@NgModule({
  declarations: [
    AppComponent,
    FiltroFelcnComponent,
    //FiltroBienesComponent,
    FiltroInventarioComponent,
    FiltroImplicadosComponent,
    FiltroBienesAdeudadosComponent,
    ListComponent,
    NavegacionComponent,
    LoginComponent,
    DownloadComponent,      
    DialogComponent,
    PdfComponent,
    DatosPersonalesComponent,
    BienvenidoComponent,
    FiltroBienesCategoriaComponent
    
  ],
  imports: [
    BrowserModule, FormsModule, FlexLayoutModule,  
    ReactiveFormsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,    
    FormsModule, 
    BrowserAnimationsModule, 
    LayoutModule,  
    MatFormFieldModule,
    PdfViewerModule // <- Add PdfViewerModule to imports
    
  ],
  entryComponents:[DialogComponent, PdfComponent, ListComponent],
  providers: [
    ServiceService,
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
   
  ],  
  bootstrap: [AppComponent]
  
})
export class AppModule { }

