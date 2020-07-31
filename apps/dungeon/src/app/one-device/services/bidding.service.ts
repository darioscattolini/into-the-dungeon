import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player, Hero, IBiddingResult } from '../../models/models';
import { HeroesService } from './heroes.service';
// import { UIControllerService } from './uicontroller.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  private _hero: Hero | undefined;

  constructor(
    private heroesService: HeroesService,
    // private uiController: UIControllerService,
  ) { }

  public get hero() {
    return this._hero;
  }

  public async getResult(
    startingPlayer: Player
  ): Promise<IBiddingResult> {
    this._hero = await this.heroesService.chooseHero(startingPlayer.name);
    // ...
    return {
      raider: startingPlayer,
      hero: this._hero,
      enemies: []
    }
  }
}
