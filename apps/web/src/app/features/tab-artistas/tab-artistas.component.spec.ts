import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabArtistasComponent } from './tab-artistas.component';

describe('TabArtistasComponent', () => {
  let component: TabArtistasComponent;
  let fixture: ComponentFixture<TabArtistasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabArtistasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabArtistasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
