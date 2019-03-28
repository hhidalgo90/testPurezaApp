import { Injectable } from '@angular/core';
import { Pregunta } from '../clases/pregunta';
import { Observable, of } from 'rxjs';
import { MOCKPREGUNTAS } from '../clases/mock-preguntas';

@Injectable({
  providedIn: 'root'
})
export class ObtenerPreguntasService {
  constructor() { }


  getPreguntas(): Observable<Pregunta[]> {
  return of (MOCKPREGUNTAS);
  }
}
