import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario'
import { Pregunta } from '../clases/pregunta';
import { AbstractControl, ValidationErrors, FormControl, Validators, ReactiveFormsModule, FormsModule, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
public titulo = "Datos Personales";
pregunta : Pregunta[];
public datosUsuario = new Usuario;
mensajeError : String;
formUser : FormGroup;

sexos: any[] = [
  {
    id: 1,
    texto: 'Hombre'
  },
  {
    id: 2,
    texto: 'Mujer'
  },
  {
    id: 3,
    texto: 'Otro'
  }
];
  constructor(private router: Router){

   }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.formUser = new FormGroup({
      nombreUser: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(10)]),
      edadUser: new FormControl('', [Validators.required]),
      emailUser: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      sexoUser: new FormControl('', [Validators.required])      
    });
  }

  navigate(){
    console.log(this.datosUsuario);
    //this.validarFormulario();
    this.router.navigate(['/mostrarPreguntas' , this.datosUsuario]);
  }

  validarFormulario(){
    console.log("validar form");

    if(this.datosUsuario.edad == undefined || this.datosUsuario.edad<=0 || this.datosUsuario.nombre === ""){
      this.mensajeError = "Todos los datos son obligatorios!";
      if(this.formUser.get('nombreUser').hasError('minlength') || this.formUser.get('nombreUser').hasError('maxlength') ||this.formUser.get('nombreUser').hasError('pattern') ||this.formUser.get('nombreUser').hasError('required')){
        console.log("datos qlos malos");
      }
      return false;
    }
    else{
      return true;
    }
  }

}
