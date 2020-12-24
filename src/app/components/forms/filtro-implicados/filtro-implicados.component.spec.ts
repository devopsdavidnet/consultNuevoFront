import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroImplicadosComponent } from './filtro-implicados.component';

describe('FiltroImplicadosComponent', () => {
  let component: FiltroImplicadosComponent;
  let fixture: ComponentFixture<FiltroImplicadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroImplicadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroImplicadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
