/*
*----------------------------------------------------------------------------------
*-- Creado: AINIGUEZ                               Fecha: 03/08/2020            --
*-- Módulo: Consulta de Bienes                                                   --
*-- Componente typescript modificaciones cambio de password del usuario logueado --
*-- en el sistema                                                                -- 
*----------------------------------------------------------------------------------
*/

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ServiceService } from '../../../services/service.service';
import { sha256 } from 'js-sha256';

export interface TipoDoc{
  value: string;
  viewValue: string;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  
  // declaración de variables
  islogged: boolean =false;  
  hide = true;  
  myForm: FormGroup;
  matcher = new MyErrorStateMatcher();    

  tipodoc: TipoDoc[] = [       
      {value: 'CI', viewValue: 'Carnet de Identidad'},  
      {value: 'CE', viewValue: 'Carnet de Extranjero'}
  ];

  // funciones
  constructor(private formBuilder: FormBuilder, public service: ServiceService,) {
    this.myForm = this.formBuilder.group({
      password: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      appaterno: ['', [Validators.required]],
      apmaterno: ['', [Validators.required]],
      tipodoc:[''],
      ci:[''],
      clave_actual:[''],
      confirmPassword: ['']
    }, { validator: this.checkPasswords });

  }

  ngOnInit() {
    
     this.myForm.patchValue({
      tipodoc: 'CI',
      nombre:sessionStorage.getItem("nombres"),
      appaterno:sessionStorage.getItem("appaterno"),
      apmaterno:sessionStorage.getItem("apmaterno")
     })     
  }


  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPassword.value;
    return pass === confirmPass ? null : { notSame: true }
  }

  flag(flag:boolean){    
    this.islogged=flag;
  }
  
  set_password()  {         
    if (this.myForm.get('password').value === this.myForm.get('confirmPassword').value)  
    {
      this.service.set_password(
        sessionStorage.getItem("usuario_ingreso"), 
        sha256(this.myForm.get('clave_actual').value), 
        sha256(this.myForm.get('confirmPassword').value)
        ).subscribe(data=>{
          if(data){                
            alert("la constraseña se cambio correctamente");
          }else{
            alert("la contraseña actual no es correcta, favor verificar");
          }  
        },  error => console.log("errorr :"+error)
      );
    }
  }
}
