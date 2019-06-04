import { Component, OnInit } from '@angular/core';
import { ObtenerPreguntasService } from '../services/obtener-preguntas.service';
import { Pregunta } from '../clases/pregunta';

@Component({
  selector: 'app-mostrar-preguntas',
  templateUrl: './mostrar-preguntas.page.html',
  styleUrls: ['./mostrar-preguntas.page.scss'],
})
export class MostrarPreguntasPage implements OnInit {

  preguntas : Pregunta[];
  unit ="";
  public titulo = "Test Pureza";
  inicio : number;
  tope : number;
  numeroPreguntas : number;
  mostrarBtnSiguiente : boolean;
  mostrarBtnFinalizar : boolean;

  constructor(private obtenerPreguntasService : ObtenerPreguntasService ) { }

  ngOnInit() {
    this.getPreguntas();
    this.inicio = 0;
    this.tope = 5;
    this.mostrarBtnSiguiente = true; 
    this.mostrarBtnFinalizar = false;
  }

  //Obtiene preguntas desde un servicio REST
  getPreguntas(): void{
    this.obtenerPreguntasService.getPreguntas().subscribe(resultado=>{
      this.preguntas = resultado
    });
  }

  guardarRespuestas(): void{
    console.log("llegue a guardarRespuestas: respuestas " + this.preguntas[0].respuesta);
}

siguientePregunta(){
  this.numeroPreguntas = this.preguntas.length;
  if(this.tope < this.numeroPreguntas){
    this.inicio+=5;
    this.tope+=5;
  }
  else{
    console.log("Se acabo esta mierda");
    this.mostrarBtnSiguiente = false;
    this.mostrarBtnFinalizar = true;
  }
}
}
