import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPatternPopupComponent } from './test-pattern-popup.component';

describe('TestPatternPopupComponent', () => {
  let component: TestPatternPopupComponent;
  let fixture: ComponentFixture<TestPatternPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPatternPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPatternPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
