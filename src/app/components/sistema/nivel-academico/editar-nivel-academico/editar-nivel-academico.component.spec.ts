import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNivelAcademicoComponent } from './editar-nivel-academico.component';

describe('EditarNivelAcademicoComponent', () => {
  let component: EditarNivelAcademicoComponent;
  let fixture: ComponentFixture<EditarNivelAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarNivelAcademicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarNivelAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
