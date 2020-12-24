/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                               Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript de validación del usuario y contraseña para ingresar   --
*-- al sistema, cierre y control de sesión.                                      --
*----------------------------------------------------------------------------------
*/

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/service.service';
import { sha256 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // declaración de variables
  islogged:boolean =false;
  username: string;
  password: string;
  showSpinner: string;

  // funciones
  constructor(private router: Router, private service:ServiceService) { }
  ngOnInit() {
  }
  login(){        
    this.service.verificar(this.username,sha256(this.password))
    .subscribe( data =>{    
      if(data===null){
        alert("Credenciales Incorrectas")
      }else{
        sessionStorage.setItem("idusuario",data.idUsuario.toString());
        sessionStorage.setItem("usuario_ingreso",this.username);
        if(data.nombres ==undefined  ){
          data.nombres="";
        }
        if(data.apellidoP ==undefined ){
          data.apellidoP="";
        }
        if(data.apellidoM ==undefined ){
          data.apellidoM="";
        }
        sessionStorage.setItem("usuario",data.nombres+" "+data.apellidoP+" "+data.apellidoM);
        sessionStorage.setItem("nombres",data.nombres);
        sessionStorage.setItem("appaterno",data.apellidoP);
        sessionStorage.setItem("apmaterno",data.apellidoM);
        sessionStorage.setItem("oficina",data.oficina);
        sessionStorage.setItem("idOficinaC",data.idOficina.toString());
      }
     },
             
     );     
  }
  
  //funcion para controlar la sesion
  getislogged() : boolean {
    if(sessionStorage.getItem("usuario")== null 
      || sessionStorage.getItem("usuario_ingreso")==null){
          return false;
    } else 
          return true;
  }

  CambiarLogged(flag:boolean){      
    sessionStorage.clear(); 
    this.islogged=flag;
  }
}
