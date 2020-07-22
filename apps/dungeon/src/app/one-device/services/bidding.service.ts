import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { IPlayer } from '../../models/models';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  constructor() { }

  public startNewRound(startingPlayer: IPlayer): void {
    this.chooseHero(startingPlayer);
  }

  public chooseHero(startingPlayer: IPlayer): void {

  }
}
