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
    firstPlayer: Player
  ): Promise<IBiddingResult> {
    this._hero = await this.heroesService.chooseHero(firstPlayer.name);
    // ...
    return {
      raider: 'SomePlayer',
      hero: this._hero,
      enemies: []
    }
  }

  
}
