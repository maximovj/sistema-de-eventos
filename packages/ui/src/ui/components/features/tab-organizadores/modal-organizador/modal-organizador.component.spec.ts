import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrganizadorComponent } from './modal-organizador.component';

describe('ModalOrganizadorComponent', () => {
  let component: ModalOrganizadorComponent;
  let fixture: ComponentFixture<ModalOrganizadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalOrganizadorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalOrganizadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the form when create mode is reopened', () => {
    component.mode = 'create';
    component.isOpen = true;
    component.ngOnChanges({
      mode: {
        currentValue: 'create',
        previousValue: 'view',
        firstChange: false,
        isFirstChange: () => false,
      },
      isOpen: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    component.editarOrganizador.update(organizador => ({ ...organizador, nombre: 'Organizador temporal' }));

    component.isOpen = false;
    component.ngOnChanges({
      isOpen: {
        currentValue: false,
        previousValue: true,
        firstChange: false,
        isFirstChange: () => false,
      },
    });
    component.isOpen = true;
    component.ngOnChanges({
      isOpen: {
        currentValue: true,
        previousValue: false,
        firstChange: false,
        isFirstChange: () => false,
      },
    });

    expect(component.editarOrganizador().nombre).toBe('');
    expect(component.editarOrganizador().rfc).toBe('');
  });
});
