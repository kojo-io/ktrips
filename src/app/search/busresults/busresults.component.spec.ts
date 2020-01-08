import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusresultsComponent } from './busresults.component';

describe('BusresultsComponent', () => {
  let component: BusresultsComponent;
  let fixture: ComponentFixture<BusresultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusresultsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusresultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
