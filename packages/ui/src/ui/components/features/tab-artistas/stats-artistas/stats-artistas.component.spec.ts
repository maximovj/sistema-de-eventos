import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsArtistasComponent } from './stats-artistas.component';

describe('StatsArtistasComponent', () => {
  let component: StatsArtistasComponent;
  let fixture: ComponentFixture<StatsArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsArtistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatsArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
