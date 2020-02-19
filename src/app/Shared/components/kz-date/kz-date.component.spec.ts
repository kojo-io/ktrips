import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KzDateComponent } from './kz-date.component';

describe('KzDateComponent', () => {
  let component: KzDateComponent;
  let fixture: ComponentFixture<KzDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KzDateComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KzDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
