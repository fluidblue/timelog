import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainViewComponent } from './main-view.component';

describe('MainViewComponent', () => {
  let component: MainViewComponent;
  let fixture: ComponentFixture<MainViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the first day of the week', () => {
    let startOfWeek = 1 // Monday
    expect(component.getBeginOfWeek(new Date("2022-01-31"), startOfWeek)).toEqual(new Date("2022-01-31"));
    expect(component.getBeginOfWeek(new Date("2022-02-01"), startOfWeek)).toEqual(new Date("2022-01-31"));
    expect(component.getBeginOfWeek(new Date("2022-02-02"), startOfWeek)).toEqual(new Date("2022-01-31"));
    expect(component.getBeginOfWeek(new Date("2022-02-03"), startOfWeek)).toEqual(new Date("2022-01-31"));
    expect(component.getBeginOfWeek(new Date("2022-02-04"), startOfWeek)).toEqual(new Date("2022-01-31"));
    expect(component.getBeginOfWeek(new Date("2022-02-05"), startOfWeek)).toEqual(new Date("2022-01-31"));
    expect(component.getBeginOfWeek(new Date("2022-02-06"), startOfWeek)).toEqual(new Date("2022-01-31"));

    startOfWeek = 0 // Sunday
    expect(component.getBeginOfWeek(new Date("2022-01-31"), startOfWeek)).toEqual(new Date("2022-01-30"));
    expect(component.getBeginOfWeek(new Date("2022-02-01"), startOfWeek)).toEqual(new Date("2022-01-30"));
    expect(component.getBeginOfWeek(new Date("2022-02-02"), startOfWeek)).toEqual(new Date("2022-01-30"));
    expect(component.getBeginOfWeek(new Date("2022-02-03"), startOfWeek)).toEqual(new Date("2022-01-30"));
    expect(component.getBeginOfWeek(new Date("2022-02-04"), startOfWeek)).toEqual(new Date("2022-01-30"));
    expect(component.getBeginOfWeek(new Date("2022-02-05"), startOfWeek)).toEqual(new Date("2022-01-30"));
    expect(component.getBeginOfWeek(new Date("2022-02-06"), startOfWeek)).toEqual(new Date("2022-02-06"));

    startOfWeek = 3 // Wednesday
    expect(component.getBeginOfWeek(new Date("2022-01-31"), startOfWeek)).toEqual(new Date("2022-01-26"));
    expect(component.getBeginOfWeek(new Date("2022-02-01"), startOfWeek)).toEqual(new Date("2022-01-26"));
    expect(component.getBeginOfWeek(new Date("2022-02-02"), startOfWeek)).toEqual(new Date("2022-02-02"));
    expect(component.getBeginOfWeek(new Date("2022-02-03"), startOfWeek)).toEqual(new Date("2022-02-02"));
    expect(component.getBeginOfWeek(new Date("2022-02-04"), startOfWeek)).toEqual(new Date("2022-02-02"));
    expect(component.getBeginOfWeek(new Date("2022-02-05"), startOfWeek)).toEqual(new Date("2022-02-02"));
    expect(component.getBeginOfWeek(new Date("2022-02-06"), startOfWeek)).toEqual(new Date("2022-02-02"));

  });
});
