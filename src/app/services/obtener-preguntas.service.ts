import { Injectable } from '@angular/core';
import { Pregunta } from '../clases/pregunta';
import { Observable, of } from 'rxjs';
import { MOCKPREGUNTAS } from '../clases/mock-preguntas';
import { Usuario } from '../clases/usuario';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class ObtenerPreguntasService {
  
  constructor(public firestore: AngularFirestore) { }


  getPreguntas(): Observable<Pregunta[]> {
  return of (MOCKPREGUNTAS);
  }

  obtenerPreguntasDesdeFirebase() : AngularFirestoreCollection<Usuario[]> {
    return this.firestore.collection('usuarios');
  }

}
