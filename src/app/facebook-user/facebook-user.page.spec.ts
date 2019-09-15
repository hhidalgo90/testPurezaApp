import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacebookUserPage } from './facebook-user.page';

describe('FacebookUserPage', () => {
  let component: FacebookUserPage;
  let fixture: ComponentFixture<FacebookUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacebookUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacebookUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
