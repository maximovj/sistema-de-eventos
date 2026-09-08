import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSedesComponent } from './tab-sedes.component';

describe('TabSedesComponent', () => {
  let component: TabSedesComponent;
  let fixture: ComponentFixture<TabSedesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSedesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabSedesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
