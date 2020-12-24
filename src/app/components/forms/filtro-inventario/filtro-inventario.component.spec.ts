import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroInventarioComponent } from './filtro-inventario.component';

describe('FiltroInventarioComponent', () => {
  let component: FiltroInventarioComponent;
  let fixture: ComponentFixture<FiltroInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
