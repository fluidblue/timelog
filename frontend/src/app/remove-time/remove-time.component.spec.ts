import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTimeComponent } from './remove-time.component';

describe('RemoveTimeComponent', () => {
  let component: RemoveTimeComponent;
  let fixture: ComponentFixture<RemoveTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
