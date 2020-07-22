import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player } from '../../models/player/player';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  constructor() { }

  public startNewRound(startingPlayer: Player): void {
    this.chooseHero(startingPlayer);
  }

  public chooseHero(startingPlayer: Player): void {

  }
}
