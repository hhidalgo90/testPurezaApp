import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {MostrarPreguntasPage} from '../mostrar-preguntas/mostrar-preguntas.page';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('content') navCtrl: NavController;
  public mostrarPreguntas: any = MostrarPreguntasPage;
  options : any;
  constructor( private camera: Camera) {

  }


  public obtenerPreguntas() {
    this.navCtrl.setRoot(this.mostrarPreguntas);
  }

    //Utilizar la camara del celu.
    sacarFoto(): void{
      console.log("Llegue a sacar foto");
  
      this.options = {
        quality: 100,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum : true
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
