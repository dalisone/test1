import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenteCadastroComponent } from './gerente-cadastro.component';

describe('GerenteCadastroComponent', () => {
  let component: GerenteCadastroComponent;
  let fixture: ComponentFixture<GerenteCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenteCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenteCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
