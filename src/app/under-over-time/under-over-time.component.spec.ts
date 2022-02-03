import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderOverTimeComponent } from './under-over-time.component';

describe('UnderOverTimeComponent', () => {
  let component: UnderOverTimeComponent;
  let fixture: ComponentFixture<UnderOverTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderOverTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnderOverTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
