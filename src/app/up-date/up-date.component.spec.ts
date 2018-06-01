import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpDateComponent } from './up-date.component';

describe('UpDateComponent', () => {
  let component: UpDateComponent;
  let fixture: ComponentFixture<UpDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
