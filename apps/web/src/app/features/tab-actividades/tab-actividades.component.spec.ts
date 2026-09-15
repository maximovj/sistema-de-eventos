import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabActividadesComponent } from './tab-actividades.component';

describe('TabActividadesComponent', () => {
  let component: TabActividadesComponent;
  let fixture: ComponentFixture<TabActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
