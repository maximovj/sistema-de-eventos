import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsSedesComponent } from './stats-sedes.component';

describe('StatsSedesComponent', () => {
  let component: StatsSedesComponent;
  let fixture: ComponentFixture<StatsSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsSedesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
