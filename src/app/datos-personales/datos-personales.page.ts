import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../clases/usuario'
import { Pregunta } from '../clases/pregunta';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
public titulo = "Datos Personales";
pregunta : Pregunta[];
public datosUsuario : Usuario[] =[
  {
    nombre : "",
    edad : 0,
    email : "",
    sexo : "",
    preguntas : this.pregunta
  }
];

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
  }

  navigate(){
    //console.log("llegue navigate : nombre: " + this.datosUsuario[0].nombre + " edad: " + this.datosUsuario[0].edad + " email: " + this.datosUsuario[0].email + " sexo: " + this.datosUsuario[0].sexo);
    console.log(this.datosUsuario);
    this.router.navigate(['/mostrarPreguntas'])
  }

}
