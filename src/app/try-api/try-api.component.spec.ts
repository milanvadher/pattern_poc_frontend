import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TryApiComponent } from './try-api.component';

describe('TryApiComponent', () => {
  let component: TryApiComponent;
  let fixture: ComponentFixture<TryApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TryApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TryApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
