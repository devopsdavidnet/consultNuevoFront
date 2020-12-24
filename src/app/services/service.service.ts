/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                                Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript gestiona todos los servicios del módulo consulta de    --
*-- bienes                                                                       --
*----------------------------------------------------------------------------------
*/

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Caso } from '../components/models/caso';
import { objeto, objeto2 } from '../components/models/objeto';
import { Inventario } from '../components/models/inventario';
import { FiltroFelcnComponent } from '../components/forms/filtro-felcn/filtro-felcn.component';
import { User } from '../components/models/user';
import { addMinutes } from '../components/navegacion/navegacion.component';
import { AbstractControl, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  f: FiltroFelcnComponent;  
  
  private urlj='http://10.10.0.17:8080/sirebi-api/rest/app';   
  private url='http://10.10.0.17:8080/sirebi-api/rest/view'; 
   //private urlj='http://192.168.9.80:8080/sirebi-api/rest/app';   
   //private  url='http://192.168.9.80:8080/sirebi-api/rest/view';    
  private prueba_url = 'http://10.10.0.17:8080/sirebPrueba-api/rest/app';

  constructor(private _http:HttpClient) { }
 
  getCasos(idCaso:string,nombreCaso:string,nroFile:string,pg: number){
    this.settimeexpired(15);
    const path=`${this.url}/v3/`+idCaso+"/"+nombreCaso+"/"+nroFile+"/"+sessionStorage.getItem("idOficinaC")+"/"+pg+"/"+sessionStorage.getItem("idusuario");    
    return this._http.get<Caso[]>(path);
  }
  
  getCasosInventario(Dato:String,pagina:number){
    this.settimeexpired(15);
    const path=`${this.url}/v1/`+Dato+"/"+sessionStorage.getItem("idOficinaC")+"/"+pagina+"/"+sessionStorage.getItem("idusuario");
    return this._http.get<Caso[]>(path);  
  }

  getCasosImplicado(Dato:String, implicado: string,pagina:number){  
   this.settimeexpired(15);
   const path=`${this.url}/v2/`+Dato+"/"+implicado+"/"+sessionStorage.getItem("idOficinaC")+"/"+pagina+"/"+sessionStorage.getItem("idusuario");
   return this._http.get<Caso[]>(path);
  }

  verificar(usua:string,passw: string){
    const path=`${this.url}/login/`;   
   
     return this._http.post<User>(path, {usuario: usua,password: passw});     
  }
  
  getBienesAdeudados(dato:string,fechaInicio:string,fechaFin:string,vencido:string,idOficinaBien:string,idOficinaC: string,pg: number){
    this.settimeexpired(15);
    const path=`${this.url}/v4/`+dato+"/"+fechaInicio+"/"+fechaFin+"/"+vencido+"/"+idOficinaBien+"/"+idOficinaC+"/"+pg+"/"+sessionStorage.getItem("idusuario");
     
    return this._http.get<Caso[]>(path);

  }
  
  //Categorias
  getcategoria(){
    const path=`${this.url}/v5/categorias`;        
    return this._http.get<objeto[]>(path);    
  }
  //Sub Categorias
  getsubcategoria(cate: string){
    const path=`${this.url}/v6/subcategoria/`+cate;  
    
    
    return this._http.get<objeto[]>(path);    
  }
  //Oficina
  getOficina(codigo: string){
    const path=`${this.url}/oficina/`+codigo;        
    return this._http.get<objeto[]>(path);    
  }
 
  
  //Sub Categorias
  gettipobien(subcate: string){
    const path=`${this.url}/v7/tipobien/`+subcate;        
    return this._http.get<objeto[]>(path);    
    }
  
  getbienes(oficinaCaso: string,fechaInicioIn:string,fechaFinIn:string,
  categoriaBien:string, subcategoriaBien:string,tipoBien:string,
  oficinaRecepcion:string,fechaInicioRep:string,fechaFinRep:string,estAdm: string,estJud: string,pg: number){
    this.settimeexpired(15);

    let ur= "http://192.168.9.80:8080/sirebi-api/rest/view/v11?";
    let path=`${ur}`;    

    
    // path=path+"/v11?codOficina="+oficinaCaso+"&fechaDesde="+fechaInicioIn+"&fechaHasta="+fechaFinIn+"&categoria="+categoriaBien+
    //            "&subcategoria="+subcategoriaBien+"&tipoBien="+tipoBien+"&codOficinab="+oficinaRecepcion+
    //            "&fechaDesdeb="+fechaInicioRep+"&fechaHastab="+fechaFinRep+"&"+estAdm+"&"+estJud+"&oficina="+oficinaCaso+"&pagina="+pg+"&idUsuario="+sessionStorage.getItem("idusuario");
    path=path+"v11?codOficina="+oficinaCaso+"&categoria="+categoriaBien+"&idUsuario="+sessionStorage.getItem("idusuario");
               return this._http.get<Caso[]>(path); 

  }
  public getbienes_categoria(id_categoria:number){
    this.settimeexpired(15);

    let ur= "http://10.10.0.17:8080/sirebPrueba-api/rest/view/v11?";
    let path=`${ur}`; 
    path=path+"v11?codOficina="+sessionStorage.getItem("idOficinaC")+"&categoria="+id_categoria+"&idUsuario="+sessionStorage.getItem("idusuario");
    //console.log("path nuevo+++"+path);
    return this._http.get<Caso[]>(path);    

  }

  //Servicio para consumir services rest api del jaspersever
  jasperpdf(codbien: string){
      let path=`${this.urlj}/pdf/`+codbien+'/'+sessionStorage.getItem("idusuario")+'/'+sessionStorage.getItem("idOficinaC");   
      return path;
    } 

  jasperPdfMasivo(codCaso: string){
      let path=`${this.urlj}/pdf/m/`+codCaso+'/'+sessionStorage.getItem("idusuario");         
      return path;
  }  
  
  jasperexcel_felcn(codigo: string,nombreCaso:string,nrofile:string){

    let path=`${this.urlj}/flcn/`+codigo+'/'+nombreCaso+'/'+nrofile+'/'+sessionStorage.getItem("idOficinaC")+'/'+sessionStorage.getItem("idusuario");         

    return path;
  }  
  
  jasperexcel_bien(oficinaCaso: string,fechaInicioIn:string,fechaFinIn:string,
    categoriaBien:string, subcategoriaBien:string,tipoBien:string,
    oficinaRecepcion:string,fechaInicioRep:string,fechaFinRep:string,estAdm: string,estJud: string){    
    this.settimeexpired(15);
    let path=`${this.urlj}`;     
    
    path=path+"/bienes?codOficina="+oficinaCaso+"&fechaDesde="+fechaInicioIn+"&fechaHasta="+fechaFinIn+"&categoria="+categoriaBien+
               "&subcategoria="+subcategoriaBien+"&tipoBien="+tipoBien+"&codOficinab="+oficinaRecepcion+
               "&fechaDesdeb="+fechaInicioRep+"&fechaHastab="+fechaFinRep+"&"+estAdm+"&"+estJud+"&oficina="+oficinaCaso+"&idUsuario="+sessionStorage.getItem("idusuario");    
            return path;
  } 

  jasperexcel_implicado(Dato:string, implicado: string){
    this.settimeexpired(15);
    let path=`${this.urlj}/implicados/`+Dato+'/'+implicado+'/'+sessionStorage.getItem("idOficinaC")+'/'+sessionStorage.getItem("idusuario");         
    return path;    
  } 

  jasperexcel_inventario(Dato:string){
    this.settimeexpired(15);
    let path=`${this.urlj}/inventarios/`+Dato+'/'+sessionStorage.getItem("idOficinaC")+'/'+sessionStorage.getItem("idusuario");         
    return path;
  } 

  jasperexcel_bien_adeudado(dato:string,fechaInicio:string,fechaFin:string,oficinaBien: string,oficinaCaso: string){
    this.settimeexpired(15);
    let path=`${this.urlj}/adeudados/`+dato+'/'+fechaInicio+'/'+fechaFin+'/'+oficinaBien+'/'+oficinaCaso+'/'+sessionStorage.getItem("vencido")+'/'+sessionStorage.getItem("idusuario");
    return path;
  }

  //servicio para inventario del bien
  getinventarios_por_bien(codbien: string){
    let limite=25;
    const path=`${this.url}/v8/bien/`+codbien+'/'+limite;        
    return this._http.get<Inventario[]>(path);  
  }

  settimeexpired(min: number){
    sessionStorage.setItem('expiredDate', addMinutes(new Date(), min).getTime().toString());    
  }
  //actualizar password
  set_password(usuario:String,password:String, newpassword:String){
    this.settimeexpired(15);    
    const path=`${this.url}/cambiop/`+usuario+"/"+password+"/"+newpassword;    
    return this._http.get<boolean>(path);  
  }

  // servicio filtro de bienes por categoría
  public getlistado(f: AbstractControl, id:string,tipo:string) {
 
    const path = `${this.prueba_url}/`+tipo+'/g?codOficina='+sessionStorage.getItem("idOficinaC")+'&categoria='+id+'&nroFelcn='+f.get('nroCasoFelcn').value+'&fechaCasoDesde='+f.get('fechaAperturaCaso').value+'&fechaCasoHasta='+f.get('fechaAperturaCaso2').value+'&nombreCaso='+f.get('nombreCaso').value+'&subCategoria='+f.get('subCategoria').value+'&tipoBien='+f.get('tipoBien').value+'&oficinaCaso='+f.get('aperturaCasoDistrital').value+'&oficinaRecepcion='+f.get('oficinaRecepcion').value+'&fechaBienDesde='+f.get('fechaRecepcion').value+'&fechaBienHasta='+f.get('fechaRecepcion2').value+'&estadoAdministrativo='+f.get('estadoAdm').value+'&estadoJuridico='+f.get('statusJudicial').value;
    return (path); 
  }
  
}

