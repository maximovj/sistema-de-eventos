import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridTarjetasArtistasComponent } from './grid-tarjetas-artistas.component';

describe('GridTarjetasArtistasComponent', () => {
  let component: GridTarjetasArtistasComponent;
  let fixture: ComponentFixture<GridTarjetasArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GridTarjetasArtistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GridTarjetasArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
