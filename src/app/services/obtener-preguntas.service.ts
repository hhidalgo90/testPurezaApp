import { Injectable } from '@angular/core';
import { Pregunta } from '../clases/pregunta';
import { Observable, of } from 'rxjs';
import { MOCKPREGUNTAS } from '../clases/mock-preguntas';
import { Usuario } from '../clases/usuario';
import { AngularFirestore, AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class ObtenerPreguntasService {
  usuarios : AngularFirestoreCollection<Usuario[]>;
  preguntas : AngularFirestoreCollection<any[]>;
  constructor(public firestore: AngularFirestore) { }


  getPreguntas(): Observable<Pregunta[]> {
  return of (MOCKPREGUNTAS);
  }

  /**
   * Funcion que obtiene documentos desde firebase
   */
  obtenerDocumentoPreguntasDesdeFirebase() : AngularFirestoreDocument<any> {
    var preguntas= this.firestore.collection('usuarios').doc('preguntas');
    
    preguntas.get().subscribe(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
      }
  })
  //console.log(this.usuarios);
  return preguntas;
  }

    /**
     * Funcion que obtiene colecciones desde firebase
     */
    obtenerColeccionPreguntasDesdeFirebase() : AngularFirestoreCollection<any[]> {
      this.preguntas = this.firestore.collection('usuarios');

      this.preguntas.valueChanges;
      // .subscribe(function(data) {    
      //   if(data)  
      //   console.log(data);
      //   this.preguntas = data;
         console.log(this.preguntas.valueChanges.name);
      // });    
    return this.preguntas;
    }
    /**
     * Funcion que guarda las respuestas del usuario en firebase.
     * @param usuario 
     */
    guardarRespuestasUsuario(usuario : Usuario){
      this.firestore.collection('respuestasUsuarios').doc(usuario.nombre).collection('respuestas').add({
        nombreUser : usuario.nombre,
        edadUser : usuario.edad,
        emailUser : usuario.email,
        respuestas : usuario.preguntas
      });
    }

    guardarRespuestasUsuario(usuario : Usuario){
      this.firestore.collection('respuestasUsuarios').doc(usuario.nombre).collection('respuestas').add({
        nombreUser : usuario.nombre,
        edadUser : usuario.edad,
        emailUser : usuario.email,
        respuestas : usuario.preguntas
      });
    }

}
