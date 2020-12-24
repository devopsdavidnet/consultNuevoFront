import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroBienesCategoriaComponent } from './filtro-bienes-categoria.component';

describe('FiltroBienesCategoriaComponent', () => {
  let component: FiltroBienesCategoriaComponent;
  let fixture: ComponentFixture<FiltroBienesCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroBienesCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroBienesCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
