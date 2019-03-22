import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayNormalisedComponent } from './display-normalised.component';

describe('DisplayNormalisedComponent', () => {
  let component: DisplayNormalisedComponent;
  let fixture: ComponentFixture<DisplayNormalisedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayNormalisedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayNormalisedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
