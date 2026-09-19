import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePanelActividadesComponent } from './detalle-panel-actividades.component';

describe('DetallePanelActividadesComponent', () => {
  let component: DetallePanelActividadesComponent;
  let fixture: ComponentFixture<DetallePanelActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallePanelActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallePanelActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
