import { TestBed } from '@angular/core/testing';

import { ObtenerRespuestasService } from './obtener-respuestas.service';

describe('ObtenerRespuestasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObtenerRespuestasService = TestBed.get(ObtenerRespuestasService);
    expect(service).toBeTruthy();
  });
});
