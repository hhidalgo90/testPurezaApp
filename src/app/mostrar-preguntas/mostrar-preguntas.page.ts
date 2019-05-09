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
  constructor(private obtenerPreguntasService : ObtenerPreguntasService ) { }

  ngOnInit() {
    this.getPreguntas();
  }

  //Obtiene preguntas desde un servicio REST
  getPreguntas(): void{
    this.obtenerPreguntasService.getPreguntas().subscribe(preguntas=>this.preguntas = preguntas);
  }

  guardarRespuestas(): void{
    console.log("llegue a guardarRespuestas: respuestas " + this.preguntas[0].respuesta);
}

}
