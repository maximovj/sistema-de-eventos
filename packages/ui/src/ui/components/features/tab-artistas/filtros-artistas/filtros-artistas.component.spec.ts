import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosArtistasComponent } from './filtros-artistas.component';

describe('FiltrosArtistasComponent', () => {
  let component: FiltrosArtistasComponent;
  let fixture: ComponentFixture<FiltrosArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltrosArtistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltrosArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
