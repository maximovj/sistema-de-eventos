import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsActividadesComponent } from './stats-actividades.component';

describe('StatsActividadesComponent', () => {
  let component: StatsActividadesComponent;
  let fixture: ComponentFixture<StatsActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
