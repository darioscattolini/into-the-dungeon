import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDeviceComponent } from './one-device.component';

describe('OneDeviceComponent', () => {
  let component: OneDeviceComponent;
  let fixture: ComponentFixture<OneDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('it is created', () => {
    expect(component).toBeTruthy();
  });
});
