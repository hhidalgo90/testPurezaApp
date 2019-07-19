import { Component, OnInit ,ViewChild, Injectable} from '@angular/core';
import { ObtenerPreguntasService } from '../services/obtener-preguntas.service';
import { Pregunta } from '../clases/pregunta';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router'; //Router de angular para hacer navegacion.
import { ModalController, IonContent, LoadingController, AlertController } from '@ionic/angular'; //Libreria para utilizar modal. LoadingController, AlertController para mostrar un 'cargando' y mostrar alert en caso de error
import { ModalPreguntasPage } from '../modal-preguntas/modal-preguntas.page'; //Pagina utilizada como modal.
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-mostrar-preguntas',
  templateUrl: './mostrar-preguntas.page.html',
  styleUrls: ['./mostrar-preguntas.page.scss'],
})
@Injectable() 
export class MostrarPreguntasPage implements OnInit {
  @ViewChild(IonContent) content: IonContent; //Se usa para obtener contenido y despues hacer scroll top.

  public preguntas : Pregunta[]  = new Array();
  unit ="";
  public titulo = "Test Pureza";
  inicio : number;
  tope : number;
  numeroPreguntas : number;
  mostrarBtnSiguiente : boolean;
  mostrarBtnFinalizar : boolean;
  mostrarBtnAtras : boolean;
  public mostrarPreguntas: any = MostrarPreguntasPage;
  public listaPreguntas : Array<Object> = new Array();
  public usuario = new Usuario;

  constructor(private obtenerPreguntasService : ObtenerPreguntasService,private router: Router, public modalController: ModalController, public loadingCtrl: LoadingController,
    public alertCtrl: AlertController , public route: ActivatedRoute) { 
    }

  ngOnInit() {
    this.getColeccionPreguntas();
    this.inicio = 0;
    this.tope = 5;
    this.mostrarBtnSiguiente = true; 
    this.mostrarBtnFinalizar = false;
    this.mostrarBtnAtras = false;
    this.usuario.nombre = this.route.snapshot.paramMap.get('nombre');
    this.usuario.edad = +this.route.snapshot.paramMap.get('edad'); //signo + convierte string a number
    this.usuario.email = this.route.snapshot.paramMap.get('email');
    this.usuario.sexo = this.route.snapshot.paramMap.get('sexo');
    console.log("datos usuario" + this.usuario);
  }

  //Obtiene preguntas desde un servicio en FIREBASE, trae un documento, no se va a utilizar pero sirve de prueba
  async getPreguntas() {
    const loading = await this.loadingCtrl.create();
    this.obtenerPreguntasService.obtenerDocumentoPreguntasDesdeFirebase().valueChanges()
    .subscribe(respuesta=>{
        this.listaPreguntas.push(respuesta);
      console.log(this.listaPreguntas);
      loading.dismiss();
    });

    return await loading.present();
  }
  
  /**
   * Metodo que obtiene listado de preguntas obtenidas de un servicio de FIREBASE.
   */
  async getColeccionPreguntas() {
    const loading = await this.loadingCtrl.create();
    this.obtenerPreguntasService.obtenerColeccionPreguntasDesdeFirebase().valueChanges()
    .subscribe(respuesta=>{
      console.log(respuesta);
        this.listaPreguntas = respuesta;
        this.ordenarPreguntas(this.listaPreguntas);
      console.log(this.listaPreguntas);
      loading.dismiss();
    });

    return await loading.present();
  }

  guardarRespuestas(): void{
    console.log("llegue a guardarRespuestas: respuestas ");
    this.usuario.preguntas = this.listaPreguntas;
    console.log("respuestas usuario ");
    console.log(this.usuario);
    this.listaPreguntas.forEach(function (element){
      console.log(element);
    });
}

/**
 * Metodo para avanzar en el listado de preguntas.
 */
siguientePregunta(){
  this.numeroPreguntas = this.listaPreguntas.length;
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
  this.numeroPreguntas = this.listaPreguntas.length;
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
      'texto' : "Si aceptas no podras modificar tus respuestas."},
      cssClass: "modalClass"
  });
   modal.present();
   const { data } = await modal.onDidDismiss();
   console.log(data);
   if(data.result == true){
    this.guardarRespuestas();

    let navigationExtras: NavigationExtras = {
      state: {
        user: this.usuario
      }
    };
    
    this.router.navigate(['/mostrarRespuestas'], navigationExtras);
   }
   else{
    this.router.navigate(['/mostrarPreguntas']);
   }
}

/**
 * Metodo que ordena el arreglo de preguntas por el id de la pregunta en orden ascendente.
 * @param listaPreguntas 
 */
ordenarPreguntas(listaPreguntas: Object[]): any {
  if(!listaPreguntas || listaPreguntas === undefined || listaPreguntas.length === 0) return null;

  listaPreguntas.sort((a: any, b: any) => {
    if (a.idPregunta < b.idPregunta) {
      return -1;
    } else if (a.idPregunta > b.idPregunta) {
      return 1;
    } else {
      return 0;
    }
  });
  return listaPreguntas;
};

set data(value: Usuario) { 
  console.log("llegue SET");
  
  this.usuario = value; 
} 
}
