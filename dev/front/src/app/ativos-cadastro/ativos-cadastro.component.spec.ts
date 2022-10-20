import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtivosCadastroComponent } from './ativos-cadastro.component';

describe('AtivosCadastroComponent', () => {
  let component: AtivosCadastroComponent;
  let fixture: ComponentFixture<AtivosCadastroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtivosCadastroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtivosCadastroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
