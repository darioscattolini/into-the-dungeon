import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { paths } from '../app-routing.paths';
import { HomeComponent } from './home.component';

@Component({
  selector: 'dungeon-target-stub',
  template: ''
})
class TargetStubComponent {}

class Page {
  get heading()      { return this.query<HTMLElement>('h1'); }
  get description()  { return this.query<HTMLElement>('#description'); }
  get buttons()      { return Array.from(this.queryAll<HTMLButtonElement>('button')); }
  get oneDeviceBtn() { 
    return this.buttons.find(button => (<string>button.textContent).includes('One Device'));
  }
  get onlineBtn()    { 
    return this.buttons.find(button => (<string>button.textContent).includes('Online'));
  }
  
  constructor(private fixture: ComponentFixture<HomeComponent>) { }

  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let location: Location;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ 
        HomeComponent,
        TargetStubComponent
      ],
      imports: [ RouterTestingModule.withRoutes([
        { path: paths.oneDevice, component: TargetStubComponent },
        { path: paths.online, component: TargetStubComponent }
      ]) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create HomeComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Into the Dungeon" heading', () => {
    expect(page.heading.textContent).toContain('Into the Dungeon');
  });

  it('should contain a #description element', () => {
    expect(page.description).toBeTruthy();
  });

  it('should contain a #description element with certain keywords', () => {
    const descriptionContent = <string>page.description.textContent?.toLowerCase();
    expect(descriptionContent).toContain('hero');
    expect(descriptionContent).toContain('dungeon');
    expect(descriptionContent).toContain('monster');
    expect(descriptionContent).toContain('equipment');
    expect(descriptionContent).toContain('survive');
    expect(descriptionContent).toContain('online');
    expect(descriptionContent).toContain('single device');
    expect(descriptionContent).toContain('multi-player');
  });

  it('should contain two buttons', () => {
    expect(page.buttons.length).toStrictEqual(2);
  });

  it('should display one-device button', () => {
    expect(page.oneDeviceBtn).toBeTruthy();
  });

  it('should display online button', () => {
    expect(page.onlineBtn).toBeTruthy();
  });

  it ('should navigate to /one-device when one-device button clicked', fakeAsync(() => {
    if (fixture.ngZone) {

      fixture.ngZone.run(() => { 

        if (page.oneDeviceBtn) {
          page.oneDeviceBtn.click();
        } else {
          throw new Error('Cannot run test because page.oneDeviceBtn is undefined');
        }

      });

      flush();

      expect(location.path()).toBe('/' + paths.oneDevice);

    } else {
      throw new Error('Cannot run test because fixture.ngZone is null');
    }
  }));

  it ('should navigate to /online when online button clicked', fakeAsync(() => {
    if (fixture.ngZone) {

      fixture.ngZone.run(() => { 
        if (page.onlineBtn) {
          page.onlineBtn.click();
        } else {
          throw new Error('Cannot run test because page.onlineBtn is undefined');
        }
      });

      flush();

      expect(location.path()).toBe('/' + paths.online);

    } else {
      throw new Error('Cannot run test because fixture.ngZone is null');
    }
  }));
});
