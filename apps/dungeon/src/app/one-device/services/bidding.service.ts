import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player } from '../../models/models';
import { HeroesService } from './heroes.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  constructor(
    private heroesService: HeroesService
  ) { }

  public startNewRound(startingPlayer: Player): void {
    this.chooseHero(startingPlayer);
  }

  public chooseHero(startingPlayer: Player): void {

  }
}
