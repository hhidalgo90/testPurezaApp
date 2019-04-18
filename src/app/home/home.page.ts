import { Component, ViewChild } from '@angular/core';
import { Nav } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import {MostrarPreguntasPage} from '../mostrar-preguntas/mostrar-preguntas.page';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  @ViewChild('content') navCtrl: NavController;
  public mostrarPreguntas: any = MostrarPreguntasPage;
  constructor() {

  }


  public obtenerPreguntas() {
    this.navCtrl.setRoot(this.mostrarPreguntas);
  }
}
