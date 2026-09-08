import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilaSedeComponent } from './fila-sede.component';

describe('FilaSedeComponent', () => {
  let component: FilaSedeComponent;
  let fixture: ComponentFixture<FilaSedeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilaSedeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FilaSedeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
