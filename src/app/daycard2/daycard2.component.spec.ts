import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Daycard2Component } from './daycard2.component';

describe('Daycard2Component', () => {
  let component: Daycard2Component;
  let fixture: ComponentFixture<Daycard2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Daycard2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Daycard2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
