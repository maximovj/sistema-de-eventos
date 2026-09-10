import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginacionArtistasComponent } from './paginacion-artistas.component';

describe('PaginacionArtistasComponent', () => {
  let component: PaginacionArtistasComponent;
  let fixture: ComponentFixture<PaginacionArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginacionArtistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginacionArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
