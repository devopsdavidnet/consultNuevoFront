import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBienesAdeudadosComponent } from './filtro-bienes-adeudados.component';

describe('FiltroBienesAdeudadosComponent', () => {
  let component: FiltroBienesAdeudadosComponent;
  let fixture: ComponentFixture<FiltroBienesAdeudadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroBienesAdeudadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBienesAdeudadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
