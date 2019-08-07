import { Component, OnInit } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { Router, ActivatedRoute } from '@angular/router'; //Router de angular para hacer navegacion.

@Component({
  selector: 'app-mostrar-respuestas',
  templateUrl: './mostrar-respuestas.page.html',
  styleUrls: ['./mostrar-respuestas.page.scss'],
})
export class MostrarRespuestasPage implements OnInit {
  public usuario = new Array;
  constructor(public router: Router, public route: ActivatedRoute) { 
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
}
