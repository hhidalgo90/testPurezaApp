import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreguntasPage } from './modal-preguntas.page';

describe('ModalPreguntasPage', () => {
  let component: ModalPreguntasPage;
  let fixture: ComponentFixture<ModalPreguntasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreguntasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreguntasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
