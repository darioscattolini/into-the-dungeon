  // THIS MODULE CAN'T CURRENTLY BE UNIT TESTED
/*
import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed, fakeAsync, flush } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule, SpyNgModuleFactoryLoader } from '@angular/router/testing';
import { appRoutes } from './app-routing.module';
import { paths } from './app-routing.paths';

@Component({selector: 'dungeon-root-stub', template: '<router-outlet></router-outlet>'})
class AppStubComponent { }

/*@Component({
  selector: 'dungeon-home-stub', 
  template: `
    <a id="one-device" routerLink="${paths.oneDevice}">One Device</a>
    <a id="online" routerLink="${paths.online}">Online</a>`
})
class HomeStubComponent { }*\/
@Component({
  selector: 'dungeon-home-stub', 
  template: `<p id="home-works">home works</p>`
})
class HomeStubComponent { }

/*@Component({
  selector: 'dungeon-one-device-stub', 
  template: `<p>one-device</p>`
})
class OneDeviceStubEntryComponent { }*\/

@NgModule({
  //declarations: [ OneDeviceStubEntryComponent ]
})
class OneDeviceStubModule { }

/*@Component({
  selector: 'dungeon-online-stub', 
  template: `<p>online</p>`
})
class OnlineStubEntryComponent { }*\/

@NgModule({
  //declarations: [ OnlineStubEntryComponent ]
})
class OnlineStubModule { }

/*for (const route of appRoutes) {
  switch(route.path) {
    case paths.home:
      route.component = HomeStubComponent;
      break;
    case paths.oneDevice:
      route.loadChildren = 'oneDevice';
      break;
    case paths.online:
      route.loadChildren = 'online';
      break;
  }
}*\/

class Dollar {
  amount;
  constructor(initialAmount) { }
  times = function(multiplier) { 
    this.amount = 10;
  }
}

describe('appRoutes', () => {
  let stubbedApp: AppStubComponent;
  let fixture: ComponentFixture<AppStubComponent>;
  let router: Router;
  let loader: SpyNgModuleFactoryLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(appRoutes)
      ],
      declarations: [
        AppStubComponent,
        HomeStubComponent
      ],
      providers: [ SpyNgModuleFactoryLoader ]
    }).compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    router = TestBed.inject(Router);
    loader = TestBed.inject(SpyNgModuleFactoryLoader);
    /*loader.stubbedModules = {
      oneDevice: OneDeviceStubModule,
      online: OnlineStubModule
    }*\/
    fixture = TestBed.createComponent(AppStubComponent);
    stubbedApp = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    fixture.ngZone.run(() => router.initialNavigation());
    flush();
    fixture.autoDetectChanges();
  }));

  it('should create the app', () => {
    expect(stubbedApp).toBeTruthy();
  });

  it('should automatically load HomeStubComponent', () => {
    const homeWorksEl: HTMLElement = fixture.nativeElement.querySelector('#home-works');
    expect(homeWorksEl.innerHTML).toContain('home works');
  });

  it('should navigate to /one-device when one-device button clicked', () => {
    
  });

  it('should load OneDeviceModule entry component after navigation to /one-device', () => {
    
  });

  it('should navigate to /online when online button clicked', () => {
    
  });

  it('should load OnlineModule entry component after navigation to /online', () => {
    
  });

});
*/