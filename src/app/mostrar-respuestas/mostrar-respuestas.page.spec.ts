import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarRespuestasPage } from './mostrar-respuestas.page';

describe('MostrarRespuestasPage', () => {
  let component: MostrarRespuestasPage;
  let fixture: ComponentFixture<MostrarRespuestasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarRespuestasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarRespuestasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
