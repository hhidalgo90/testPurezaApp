import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ObtenerPreguntasService } from '../services/obtener-preguntas.service';
import { Usuario } from '../clases/usuario';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.page.html',
  styleUrls: ['./mostrar-usuarios.page.scss'],
})
export class MostrarUsuariosPage implements OnInit {
  public listaUsuarios : Array<Object> = new Array();
  public usuario: Usuario;
  public items = [{
    nombre: "uno"
  },
  {
    nombre: "dos"
  },
  {
    nombre: "tres"
  }];
  constructor(private loadingCtrl: LoadingController, private obtenerPreguntasService : ObtenerPreguntasService, private router : Router) {
    this.usuario = new Usuario();
   }

  ngOnInit() {
    this.getColeccionUsuarios();
  }

    /**
   * Metodo que obtiene listado de preguntas obtenidas de un servicio de FIREBASE.
   */
  async getColeccionUsuarios() {
    const loading = await this.loadingCtrl.create({      
      duration: 1000,
      message: "Obteniendo Usuarios"
    });
    this.obtenerPreguntasService.obtenerColeccionUsuariosDesdeFirebase().valueChanges()
    .subscribe(respuesta=>{
      this.listaUsuarios = respuesta;
      console.log(this.listaUsuarios);
      console.log(respuesta);
      loading.dismiss();
    });

    return await loading.present();
  }

  mostrarRespuestas(nombreUser){
    this.usuario.nombre = "asdasd";
    let respuestas = new Array;

    this.listaUsuarios.forEach(function (element:any){
      console.log(element);
      if(element.nombreUser==nombreUser){
        respuestas =element;
      }
    })

    let navigationExtras: NavigationExtras = {
      state: {
        user: respuestas
      }
    };
    
    this.router.navigate(['/mostrarRespuestas'], navigationExtras);
  }

  eliminarUsuario(nombreUser){
    console.log("eliminar usuario " + nombreUser);
    
  }

}
