import "jest-extended";
import { 
  async, ComponentFixture, TestBed, fakeAsync, flush
} from '@angular/core/testing';
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
  get heading() { 
    return this.query<HTMLElement>('h1');
  }

  get description() {
    return this.query<HTMLElement>('#description');
  }

  get buttons() { 
    return Array.from(this.queryAll<HTMLButtonElement>('button')); 
  }

  get oneDeviceBtn() { 
    return this.buttons
      .find(button => (<string>button.textContent)
      .includes('One Device'));
  }

  get onlineBtn()    { 
    return this.buttons
      .find(button => (<string>button.textContent)
      .includes('Online'));
  }
  
  constructor(private fixture: ComponentFixture<HomeComponent>) { }

  private query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  private queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}

function runInNgZone(fixture: ComponentFixture<any>, callback: () => void) {
  if (fixture.ngZone) {
    fixture.ngZone.run(callback);
    flush();
  } else {
    throw new Error('Cannot run test because fixture.ngZone is null');
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

  test('component creation', () => {
    expect(component).toBeTruthy();
  });

  test('"Into the Dungeon" heading', () => {
    expect(page.heading.textContent).toContain('Into the Dungeon');
  });

  test('existence of #description element', () => {
    expect(page.description).toBeTruthy();
  });

  test('content of #description element', () => {
    const descriptionContent = 
      (page.description.textContent as string).toLowerCase();

    expect(descriptionContent).toIncludeMultiple([
      'hero', 'dungeon', 'monster', 'equipment', 'survive', 'online',
      'single device', 'multi-player'
    ]);
  });

  test('if it contains two buttons', () => {
    expect(page.buttons).toHaveLength(2);
    expect(page.buttons).toSatisfyAll(
      button => button instanceof HTMLButtonElement
    );
  });

  test('that it contains a one-device button', () => {
    const oneDeviceBtn = page.oneDeviceBtn as HTMLButtonElement;
    const buttonContent = oneDeviceBtn.textContent as string;
    expect(oneDeviceBtn).toBeTruthy();
    expect(buttonContent.toLowerCase()).toInclude('one device');
  });

  test('that it contains an online button', () => {
    const onlineBtn = page.onlineBtn as HTMLButtonElement;
    const buttonContent = onlineBtn.textContent as string;
    expect(onlineBtn).toBeTruthy();
    expect(buttonContent.toLowerCase()).toInclude('online');
  });

  test('navigation to /one-device if one-device button clicked', fakeAsync(
    () => {
      runInNgZone(fixture, () => {
        if (page.oneDeviceBtn) {
          page.oneDeviceBtn.click();
        } else {
          throw new Error('Cannot run test because page.oneDeviceBtn is undefined');
        }
      });
      
      expect(location.path()).toBe('/' + paths.oneDevice);
  }));

  test('navigation to /online if online button clicked', fakeAsync(() => {
    runInNgZone(fixture, () => {
      if (page.onlineBtn) {
        page.onlineBtn.click();
      } else {
        throw new Error('Cannot run test because page.onlineBtn is undefined');
      }
    });
    
    expect(location.path()).toBe('/' + paths.online);
  }));
});
