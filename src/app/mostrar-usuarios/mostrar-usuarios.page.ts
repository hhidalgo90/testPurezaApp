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
    .subscribe(this.obtenerDatosUsuario)
  }
      
     // {
     // this.listaUsuarios = respuesta;

     // this.obtenerDatosUsuario(this.listaUsuarios);
      //this.objetoUsuario[0] = new ObjetoUsuario();
      //console.log(this.listaUsuarios);

     // console.log(this.datosUsuario);
      

      //  for(let i = 0; i < respuesta.length; i++){
      //    this.objetoUsuario = new ObjetoUsuario();
      //    this.objetoUsuario.id = respuesta[i].payload.doc.id;
         // this.datosUsuario.push(); = respuesta[0].payload.doc.data();
          
      //  } 
      // console.log(respuesta[0].payload.doc.data());
      // console.log(respuesta[0].payload.doc.id);
     // loading.dismiss();
    //});

   // return await loading.present();
  //}

  obtenerDatosUsuario(respuesta: []){
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
    this.obtenerPreguntasService.eliminarUsuarioFirebase(nombreUser);
  }

}
