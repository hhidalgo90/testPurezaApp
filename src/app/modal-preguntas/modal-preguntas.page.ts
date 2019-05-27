import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-preguntas',
  templateUrl: './modal-preguntas.page.html',
  styleUrls: ['./modal-preguntas.page.scss'],
})
export class ModalPreguntasPage implements OnInit {

  @Input() titulo: String;
  @Input() texto: String;
  constructor(public modalController: ModalController,  private router: Router) { }

  ngOnInit() {
    console.log("Valores:" + this.titulo)
  }

  ok() {
    console.log("Valores en OK:" + this.texto)
    this.modalController.dismiss({
      'result': true
    })
  }
  fail() {
    this.modalController.dismiss({ 'result': false });
  }

}
