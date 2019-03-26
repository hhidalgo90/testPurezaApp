import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarPreguntasPage } from './mostrar-preguntas.page';

describe('MostrarPreguntasPage', () => {
  let component: MostrarPreguntasPage;
  let fixture: ComponentFixture<MostrarPreguntasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarPreguntasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarPreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
