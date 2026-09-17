import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTarjetasActividadesComponent } from './grid-tarjetas-actividades.component';

describe('GridTarjetasActividadesComponent', () => {
  let component: GridTarjetasActividadesComponent;
  let fixture: ComponentFixture<GridTarjetasActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridTarjetasActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridTarjetasActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
