import { NgModule } from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
// routed components/modules will be imported: home, one-device, online

const appRoutes: Routes = [
  {
    path: 'one-device', 
    loadChildren: () => import('./one-device/one-device/one-device.module').then(m => m.OneDeviceModule) 
  }, { 
    path: 'online', 
    loadChildren: () => import('./online/online/online.module').then(m => m.OnlineModule) 
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
