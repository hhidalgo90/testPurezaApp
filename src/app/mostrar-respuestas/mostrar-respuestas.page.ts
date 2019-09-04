import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'; //Router de angular para hacer navegacion.
import { IonContent } from '@ionic/angular';
import { UsuarioRespuesta } from '../clases/usuario-respuesta';

@Component({
  selector: 'app-mostrar-respuestas',
  templateUrl: './mostrar-respuestas.page.html',
  styleUrls: ['./mostrar-respuestas.page.scss'],
})
export class MostrarRespuestasPage implements OnInit {
  @ViewChild(IonContent) content: IonContent; //Se usa para obtener contenido y despues hacer scroll top.
  
  public usuario = new UsuarioRespuesta;
  inicio : number;
  tope : number;
  numeroPreguntas : number;
  mostrarBtnSiguiente : boolean;
  mostrarBtnFinalizar : boolean;
  mostrarBtnAtras : boolean;


  constructor(public router: Router, public route: ActivatedRoute) { 
    this.inicio = 0;
    this.tope = 5;
    this.mostrarBtnSiguiente = true; 
    this.mostrarBtnFinalizar = false;
    this.mostrarBtnAtras = false;
    console.log("constructor");
    
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.usuario = this.router.getCurrentNavigation().extras.state.user;
        console.log(this.usuario);
      }
    });
  }

  ngOnInit() {
  }

  /**
 * Metodo para avanzar en el listado de preguntas.
 */
siguientePregunta(){
  this.numeroPreguntas = this.usuario.respuestas.length;
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
    this.mostrarBtnAtras = true;
    this.content.scrollToTop(600);
  }
}

/**
 * Metodo para volver atras en el listado de preguntas.
 */
preguntaAnterior(){
  this.numeroPreguntas = this.usuario.respuestas.length;
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
    this.content.scrollToTop(600);
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
}
