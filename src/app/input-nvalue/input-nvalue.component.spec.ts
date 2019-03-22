import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputNValueComponent } from './input-nvalue.component';

describe('InputNValueComponent', () => {
  let component: InputNValueComponent;
  let fixture: ComponentFixture<InputNValueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputNValueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputNValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
