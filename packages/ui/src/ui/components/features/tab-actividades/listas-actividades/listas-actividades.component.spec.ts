import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasActividadesComponent } from './listas-actividades.component';

describe('ListasActividadesComponent', () => {
  let component: ListasActividadesComponent;
  let fixture: ComponentFixture<ListasActividadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasActividadesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListasActividadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
