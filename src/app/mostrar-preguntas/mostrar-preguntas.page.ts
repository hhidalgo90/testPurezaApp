import { Component, OnInit ,ViewChild} from '@angular/core';
import { ObtenerPreguntasService } from '../services/obtener-preguntas.service';
import { Pregunta } from '../clases/pregunta';
import { Router } from '@angular/router'; //Router de angular para hacer navegacion.
import { ModalController, IonContent } from '@ionic/angular'; //Libreria para utilizar modal.
import { ModalPreguntasPage } from '../modal-preguntas/modal-preguntas.page'; //Pagina utilizada como modal.

@Component({
  selector: 'app-mostrar-preguntas',
  templateUrl: './mostrar-preguntas.page.html',
  styleUrls: ['./mostrar-preguntas.page.scss'],
})
export class MostrarPreguntasPage implements OnInit {
  @ViewChild(IonContent) content: IonContent; //Se usa para obtener contenido y despues hacer scroll top.

  preguntas : Pregunta[];
  unit ="";
  public titulo = "Test Pureza";
  inicio : number;
  tope : number;
  numeroPreguntas : number;
  mostrarBtnSiguiente : boolean;
  mostrarBtnFinalizar : boolean;
  mostrarBtnAtras : boolean;
  public mostrarPreguntas: any = MostrarPreguntasPage;

  constructor(private obtenerPreguntasService : ObtenerPreguntasService,private router: Router, public modalController: ModalController ) { }

  ngOnInit() {
    this.getPreguntas();
    this.inicio = 0;
    this.tope = 5;
    this.mostrarBtnSiguiente = true; 
    this.mostrarBtnFinalizar = false;
    this.mostrarBtnAtras = false;
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

/**
 * Metodo para avanzar en el listado de preguntas.
 */
siguientePregunta(){
  this.numeroPreguntas = this.preguntas.length;
  this.inicio+=5;
  this.tope+=5;
  if(this.tope < this.numeroPreguntas){
    if(this.inicio > 0){
      this.mostrarBtnAtras = true;
    }
    this.content.scrollToTop(600);
  }
  else{
    console.log("Se acabo esta mierda");
    this.mostrarBtnSiguiente = false;
    this.mostrarBtnFinalizar = true;
  }
}

/**
 * Metodo para volver atras en el listado de preguntas.
 */
preguntaAnterior(){
  this.numeroPreguntas = this.preguntas.length;
  this.inicio-=5;
  this.tope-=5;
  if( this.inicio > 0){
    if(this.tope != this.numeroPreguntas){
      this.mostrarBtnSiguiente = true;
      this.mostrarBtnFinalizar = false;
    }
    this.content.scrollToTop(600);
  }
  else{
    console.log("Se acabo esta mierda");
    this.mostrarBtnSiguiente = true;
    this.mostrarBtnFinalizar = false;
    if(this.inicio <= 0){
      this.mostrarBtnAtras = false;
    }
  }
}

/**
 * Metodo que obtiene evento de scroll en el content.
 */
doInfinite(infiniteScrollEvent) {
  infiniteScrollEvent.target.complete();
  this.inicio =0;
  this.tope = 5;
}

/**
 * Metodo para mostrar el modal al finalizar las preguntas.
 */
async presentModal() {
  const modal = await this.modalController.create({
    component: ModalPreguntasPage,
    componentProps: { 
      'titulo': "Esta seguro que desea terminar con el test?",
      'texto' : "Si seleccionas Si no podras modificar tus respuestas." }
  });
   modal.present();
   const { data } = await modal.onDidDismiss();
   console.log(data);
   if(data.result == true){
    this.guardarRespuestas();
    this.router.navigate(['/home']);
   }
   else{
    this.router.navigate(['/mostrarPreguntas']);
   }
}
}
