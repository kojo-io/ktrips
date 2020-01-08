import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatsetupComponent } from './seatsetup.component';

describe('SeatsetupComponent', () => {
  let component: SeatsetupComponent;
  let fixture: ComponentFixture<SeatsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeatsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeatsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
