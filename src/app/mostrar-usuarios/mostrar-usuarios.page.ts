import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ObtenerPreguntasService } from '../services/obtener-preguntas.service';
import { Usuario } from '../clases/usuario';
import { Router, NavigationExtras } from '@angular/router';
import { ObjetoUsuario } from '../clases/objeto-usuario';

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
  public datosUsuario :any[]= [];

  public objetoUsuario : Array<ObjetoUsuario> = new Array();
  
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
    this.obtenerPreguntasService.obtenerColeccionUsuariosDesdeFirebase().snapshotChanges()
    .subscribe(respuesta=>{
      this.listaUsuarios = respuesta;
      //console.log(this.listaUsuarios);
      //console.log(respuesta[0].payload.doc.data());
      //console.log(respuesta[0].payload.doc.id);
      this.obtenerDatosUsuario(this.listaUsuarios);
      loading.dismiss();
    });
  }
  obtenerDatosUsuario(respuesta){
    console.log(respuesta);
    let arreglo : any[] = new Array();
    for(let indice in respuesta){
      let element : any; 

      element = respuesta[indice];
      console.log(element.payload.doc.data().nombreUser);

      arreglo.push({
        id : element.payload.doc.id,
        nombreUser : element.payload.doc.data().nombreUser
      });
    

    }
    console.log(arreglo);
    this.datosUsuario = arreglo;
    console.log(this.datosUsuario);
    
  }

  mostrarRespuestas(nombreUser){
    let respuestas = new Array;

    this.listaUsuarios.forEach(function (element:any){
      console.log(element);
      if(element.payload.doc.data().nombreUser==nombreUser){
        respuestas =element.payload.doc.data().respuestas;
      }
    })

    let navigationExtras: NavigationExtras = {
      state: {
        user: respuestas,
        nombreUsuario : nombreUser
      }
    };
    
    this.router.navigate(['/mostrarRespuestas'], navigationExtras);
  }

  async eliminarUsuario(nombreUser){
    const loading = await this.loadingCtrl.create({      
      duration: 2000,
      message: "Eliminando usuario"
    });
    await loading.present();
    console.log("eliminar usuario " + nombreUser);
    this.obtenerPreguntasService.eliminarUsuarioFirebase(nombreUser);
    loading.dismiss();
  }

}
