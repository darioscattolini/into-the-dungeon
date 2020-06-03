import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  {
    path: 'one-device', 
    loadChildren: () => import('./one-device/one-device.module').then(m => m.OneDeviceModule) 
  }, { 
    path: 'online', 
    loadChildren: () => import('./online/online.module').then(m => m.OnlineModule) 
  }, {
    path: '', component: HomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // for debugging
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
