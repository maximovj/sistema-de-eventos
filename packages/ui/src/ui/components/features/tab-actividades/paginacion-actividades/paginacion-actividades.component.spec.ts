import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionActividadesComponent } from './paginacion-actividades.component';

describe('PaginacionActividadesComponent', () => {
  let component: PaginacionActividadesComponent;
  let fixture: ComponentFixture<PaginacionActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginacionActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginacionActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
