import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalArtistasComponent } from './modal-artistas.component';

describe('ModalArtistasComponent', () => {
  let component: ModalArtistasComponent;
  let fixture: ComponentFixture<ModalArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalArtistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
