import { Component, OnInit } from '@angular/core';
import { ObtenerPreguntasService } from '../services/obtener-preguntas.service';
import { Pregunta } from '../clases/pregunta';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-mostrar-preguntas',
  templateUrl: './mostrar-preguntas.page.html',
  styleUrls: ['./mostrar-preguntas.page.scss'],
})
export class MostrarPreguntasPage implements OnInit {

  preguntas : Pregunta[];
  options : any;
  constructor(private obtenerPreguntasService : ObtenerPreguntasService, private camera: Camera ) { }

  ngOnInit() {
    this.getPreguntas();
    this.sacarFoto();
  }

  //Obtiene preguntas desde un servicio REST
  getPreguntas(): void{
    this.obtenerPreguntasService.getPreguntas().subscribe(preguntas=>this.preguntas = preguntas);
  }

  guardarRespuestas(): void{
    console.log("llegue a guardarRespuestas: respuestas " + this.preguntas.values);
}

  //Obtiene preguntas desde un servicio REST
  sacarFoto(): void{
    console.log("Llegue a sacar foto");

    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(this.options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
     }, (err) => {
      console.log("Ocurrio un error: " + err);
     });
  }


}
