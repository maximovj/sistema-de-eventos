import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSedeComponent } from './modal-sede.component';

describe('ModalSedeComponent', () => {
  let component: ModalSedeComponent;
  let fixture: ComponentFixture<ModalSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
