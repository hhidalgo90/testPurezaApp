import { Component } from '@angular/core';
import {MostrarPreguntasPage} from '../mostrar-preguntas/mostrar-preguntas.page';
import { Camera } from '@ionic-native/camera/ngx';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ModalPreguntasPage } from '../modal-preguntas/modal-preguntas.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  public mostrarPreguntas: any = MostrarPreguntasPage;
  options : any;
  public titulo = "Home";
  constructor( private camera: Camera, private router: Router, public modalController: ModalController) {

  }


  public obtenerPreguntas() {
    this.router.navigate(['/mostrarPreguntas']);
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

    async presentModal() {
      const modal = await this.modalController.create({
        component: ModalPreguntasPage,
        componentProps: { 'titulo': "Lea antes de empezar",
      'texto' : "Tendras que completar una breve encuesta, una vez terminada recibiras un diagnotivo de tu estado de pureza realizado por expertos." },
      cssClass: "modalClass",
      backdropDismiss : false
      });
       modal.present();
       const { data } = await modal.onDidDismiss();
       console.log(data);
       if(data.result == true){
        this.router.navigate(['/datosPersonales']);
       }
       else{
        this.router.navigate(['/home']);
       }
    }
}
