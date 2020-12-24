import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroFelcnComponent } from './filtro-felcn.component';

describe('FiltroFelcnComponent', () => {
  let component: FiltroFelcnComponent;
  let fixture: ComponentFixture<FiltroFelcnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltroFelcnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltroFelcnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
