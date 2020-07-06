import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  constructor() { }

  public startNewRound(): void {
    
  }
}
