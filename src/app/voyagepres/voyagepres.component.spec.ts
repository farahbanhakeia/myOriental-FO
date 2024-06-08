import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoyagepresComponent } from './voyagepres.component';

describe('VoyagepresComponent', () => {
  let component: VoyagepresComponent;
  let fixture: ComponentFixture<VoyagepresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VoyagepresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VoyagepresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
