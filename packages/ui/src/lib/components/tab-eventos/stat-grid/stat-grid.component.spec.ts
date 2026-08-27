import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatGridComponent } from './stat-grid.component';

describe('StatGridComponent', () => {
  let component: StatGridComponent;
  let fixture: ComponentFixture<StatGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatGridComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
