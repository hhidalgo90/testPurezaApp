import { TestBed } from '@angular/core/testing';

import { ObtenerPreguntasService } from './obtener-preguntas.service';

describe('ObtenerPreguntasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerPreguntasService = TestBed.get(ObtenerPreguntasService);
    expect(service).toBeTruthy();
  });
});
