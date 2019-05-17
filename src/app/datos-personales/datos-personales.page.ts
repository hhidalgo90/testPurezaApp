import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.page.html',
  styleUrls: ['./datos-personales.page.scss'],
})
export class DatosPersonalesPage implements OnInit {
public titulo = "Datos Personales";
nombre:"";
edad:"";
email:"";
sexo:"";

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
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navigate(){
    console.log("llegue navigate : nombre" + this.nombre + " edad: " + this.edad + " email: " + this.email + " sexo" + this.sexo);
    this.router.navigate(['/mostrarPreguntas'])
  }

}
