import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandFormComponent } from './land-form.component';

describe('LandFormComponent', () => {
  let component: LandFormComponent;
  let fixture: ComponentFixture<LandFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
