/*
*----------------------------------------------------------------------------------
*-- Creado: MHEREDIA                                Fecha: 02/11/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona la tabla de información de bienes y los       --
*-- filtros por columna                                                          --
*----------------------------------------------------------------------------------
*/

import { Component, OnInit } from '@angular/core';
import { ServiceService} from '../../../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild} from '@angular/core';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { Caso } from '../../models/caso';
import { ListComponent } from '../../list/list.component';
import { DialogComponent} from '../../dialog/dialog.component';
import { PdfComponent } from '../../pdf/pdf.component';
import { FormBuilder, FormControl, Validators, AbstractControl} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-filtro-bienes-categoria',
  templateUrl: './filtro-bienes-categoria.component.html',
  styleUrls: ['./filtro-bienes-categoria.component.css']
})
export class FiltroBienesCategoriaComponent implements OnInit {

  // Declaración de variables
  filterValues = {};  
  swCargando1:boolean = false;
  swCarga:boolean = false;
  public mensaje : string = ''; 
  public mostrar:boolean = false;
  public displayedColumns: string[] = ['nroCasoFelcn', 'fechaAperturaCaso', 'fechaAperturaCaso2', 'aperturaCasoDistrital','oficinaRecepcion','fechaRecepcion','fechaRecepcion2', 'nombreCaso',  'estadoAdm', 'statusJudicial',  'subCategoria', 'tipoBien', 'accion'];  
  public dataSource = new MatTableDataSource<Caso>();   
  readonly formControl: AbstractControl;
  public titulo: string = '';
  public icono: string = '';
  public src: string;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Funciones
  constructor(
    private _route:ActivatedRoute,
    private service: ServiceService, 
    public dialog:MatDialog,
    public formBuilder: FormBuilder
    ) { 
      
      this.dataSource.filterPredicate = ((data, filter) => {
      const a = !filter.nroCasoFelcn || data.nroCasoFelcn.toLowerCase().indexOf(filter.nroCasoFelcn.toLowerCase())>-1;
          
      const fechaNueva = moment(data.fechaAperturaCaso, 'DD/MM/YYYY').toDate();
      const fechaFiltro = moment(filter.fechaAperturaCaso, 'DD/MM/YYYY').toDate();
      const fechaFiltro2 = moment(filter.fechaAperturaCaso2, 'DD/MM/YYYY').toDate();

      const fechaRece = moment(data.fechaRecepcion, 'DD/MM/YYYY').toDate();
      const fechaFiltroR = moment(filter.fechaRecepcion, 'DD/MM/YYYY').toDate();
      const fechaFiltroR2 = moment(filter.fechaRecepcion2, 'DD/MM/YYYY').toDate();
            
      const fa = !filter.fechaAperturaCaso || fechaNueva.getTime() >= fechaFiltro.getTime() ;  
      const fb = !filter.fechaAperturaCaso2 || fechaNueva.getTime() <= fechaFiltro2.getTime();

      const b = !filter.aperturaCasoDistrital || data.aperturaCasoDistrital.toLowerCase().indexOf(filter.aperturaCasoDistrital)>-1;
      const c = !filter.oficinaRecepcion || data.oficinaRecepcion.toLowerCase().indexOf(filter.oficinaRecepcion)>-1;    
     
      const d = !filter.fechaRecepcion || fechaRece.getTime() >= fechaFiltroR.getTime();      
      const d2 = !filter.fechaRecepcion2 || fechaRece.getTime() <= fechaFiltroR2.getTime();   

      const e = !filter.nombreCaso || data.nombreCaso.toLowerCase().indexOf(filter.nombreCaso)>-1;      
      const f = !filter.estadoAdm || data.estadoAdm.toLowerCase().indexOf(filter.estadoAdm)>-1;      
      const g = !filter.statusJudicial || data.statusJudicial.toLowerCase().indexOf(filter.statusJudicial)>-1;      
      const i = !filter.subCategoria || data.subCategoria.toLowerCase().indexOf(filter.subCategoria)>-1;
      const j = !filter.tipoBien || data.tipoBien.toLowerCase().indexOf(filter.tipoBien)>-1;

      return a && fa && fb && b && c && d && d2 && e && f && g && i && j ;
    }) as (Caso, string) => boolean;

    this.formControl = formBuilder.group({
      nroCasoFelcn: "",
      fechaAperturaCaso: new FormControl('',[Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]),
      fechaAperturaCaso2: new FormControl('',[Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]),
      aperturaCasoDistrital:"",
      oficinaRecepcion:"",
      fechaRecepcion: new FormControl('',[Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]),
      fechaRecepcion2: new FormControl('',[Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]),
      nombreCaso: "",
      estadoAdm:"",
      statusJudicial:"",
      subCategoria:"",
      tipoBien:"",
      
    });

    this.formControl.valueChanges.subscribe(value => {
      
          const filter = {...value,           
          fechaAperturaCaso: value.fechaAperturaCaso.trim().toLowerCase(),
          fechaAperturaCaso2: value.fechaAperturaCaso2.trim().toLowerCase(),
          aperturaCasoDistrital: value.aperturaCasoDistrital.trim().toLowerCase(),
          oficinaRecepcion: value.oficinaRecepcion.trim().toLowerCase(),
          fechaRecepcion: value.fechaRecepcion.trim().toLowerCase(),
          fechaRecepcion2: value.fechaRecepcion2.trim().toLowerCase(),
          nombreCaso: value.nombreCaso.trim().toLowerCase(), 
          estadoAdm: value.estadoAdm.trim().toLowerCase(),
          statusJudicial: value.statusJudicial.trim().toLowerCase(),          
          subCategoria: value.subCategoria.trim().toLowerCase(),
          tipoBien: value.tipoBien.trim().toLowerCase()
        } as string;  

        this.dataSource.filter = filter;
    
    });

  }
  
  ngOnInit() {

    this._route.paramMap.subscribe((params) => {
      
      this.swCargando1 =true;
      this.getTabla(Number(this._route.snapshot.paramMap.get('id')));
      
      switch (Number(this._route.snapshot.paramMap.get('id'))) {
        case 1: this.icono = 'home'; break;
        case 2: this.icono = 'car'; break;
        case 3: this.icono = 'tv'; break;
        case 4: this.icono = 'money-bill-wave'; break;
        case 5: this.icono = 'canadian-maple-leaf'; break;
        case 6: this.icono = 'horse'; break;
        case 7: this.icono = 'pistola'; break;
        default: this.icono = 'cube'; break;
      }
      
      //reseteando valores de busqueda
      this.formControl.get('nroCasoFelcn').setValue('');
      this.formControl.get('fechaAperturaCaso').setValue('');
      this.formControl.get('fechaAperturaCaso2').setValue('');
      this.formControl.get('aperturaCasoDistrital').setValue('');
      this.formControl.get('oficinaRecepcion').setValue('');
      this.formControl.get('fechaRecepcion').setValue('');
      this.formControl.get('fechaRecepcion2').setValue('');
      this.formControl.get('nombreCaso').setValue('');
      this.formControl.get('estadoAdm').setValue('');
      this.formControl.get('statusJudicial').setValue('');
      this.formControl.get('subCategoria').setValue('');
      this.formControl.get('tipoBien').setValue('');
      
    },
    error => console.log("errorr :"+error)
    );

    this.dataSource.paginator = this.paginator;
    
  }

  getTabla(id:number){
   
    this.swCargando1=true; //carga barra de progreso
     
    this.service.getbienes_categoria(id).subscribe((result)=>{
      
      if(result.length===0){   
        this.mensaje ="No se encontraron registros en la Búsqueda, revise los datos obligatorios e intente de nuevo...";      
        this.swCargando1=false;  
        this.titulo='';
      }else{
        this.mensaje ="";  
        this.mostrar=true;
        this.swCargando1=false;      
        this.titulo = result[0]['categoria'];
      } this.dataSource.data=result as Caso[];  

    },
      error => console.log("errorr :"+error)  
    ); 
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openInventario(codBien: string):void {
    this.dialog.open(ListComponent,{
    width: '500px', height: '400px',
    data: codBien
    });
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

  filterChange(filter, event) {
  
    this.filterValues[filter.columnProp] = event.target.value.trim().toLowerCase()
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }

  public buscar_reporte(tipo:string){
   
    this.src = this.service.getlistado(this.formControl, this._route.snapshot.paramMap.get('id'), tipo);
    window.open(this.src,'_self');
  }

}
