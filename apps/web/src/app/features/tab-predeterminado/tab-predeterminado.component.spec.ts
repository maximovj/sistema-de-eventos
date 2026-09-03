import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPredeterminadoComponent } from './tab-predeterminado.component';

describe('TabPredeterminadoComponent', () => {
  let component: TabPredeterminadoComponent;
  let fixture: ComponentFixture<TabPredeterminadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabPredeterminadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabPredeterminadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
