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
  get buttons()      { return Array.from(this.queryAll<HTMLButtonElement>('button')); }
  get oneDeviceBtn() { return this.buttons.find(button => button.textContent.includes('One Device')); }
  get onlineBtn()    { return this.buttons.find(button => button.textContent.includes('Online')); }
  get heading()      { return this.query<HTMLElement>('h1'); }
  get description()  { return this.query<HTMLElement>('#description'); }
  
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
    expect(page.description.textContent.toLowerCase()).toContain('hero');
    expect(page.description.textContent.toLowerCase()).toContain('dungeon');
    expect(page.description.textContent.toLowerCase()).toContain('monster');
    expect(page.description.textContent.toLowerCase()).toContain('equipment');
    expect(page.description.textContent.toLowerCase()).toContain('survive');
    expect(page.description.textContent.toLowerCase()).toContain('online');
    expect(page.description.textContent.toLowerCase()).toContain('single device');
    expect(page.description.textContent.toLowerCase()).toContain('multi-player');
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
    page.oneDeviceBtn.click();
    flush();
    expect(location.path()).toBe('/' + paths.oneDevice);
  }));

  it ('should navigate to /online when online button clicked', fakeAsync(() => {
    page.onlineBtn.click();
    flush();
    expect(location.path()).toBe('/' + paths.online);
  }));
});
