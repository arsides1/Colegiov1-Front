import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradoSeccionDialogoComponent } from './grado-seccion-dialogo.component';

describe('GradoSeccionDialogoComponent', () => {
  let component: GradoSeccionDialogoComponent;
  let fixture: ComponentFixture<GradoSeccionDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradoSeccionDialogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradoSeccionDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
