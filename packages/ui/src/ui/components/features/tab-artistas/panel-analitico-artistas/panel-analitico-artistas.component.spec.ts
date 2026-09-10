import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAnaliticoArtistasComponent } from './panel-analitico-artistas.component';

describe('PanelAnaliticoArtistasComponent', () => {
  let component: PanelAnaliticoArtistasComponent;
  let fixture: ComponentFixture<PanelAnaliticoArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelAnaliticoArtistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PanelAnaliticoArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
