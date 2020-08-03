import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player, Hero, Monster, IBiddingResult } from '../../models/models';
import { HeroesService } from './heroes.service';
import { MonstersService } from './monsters.service';
// import { UIControllerService } from './uicontroller.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  private _hero: Hero | undefined;
  private monstersMace: Monster[] | undefined;

  constructor(
    private heroesService: HeroesService,
    private monstersService: MonstersService
    // private uiController: UIControllerService,
  ) { }

  public get hero() {
    return this._hero;
  }

  public async getResult(
    startingPlayer: Player
  ): Promise<IBiddingResult> {
    this._hero = await this.heroesService.chooseHero(startingPlayer.name);
    this.monstersMace = this.monstersService.getMonstersPack();
    // ...
    return {
      raider: startingPlayer,
      hero: this._hero,
      enemies: []
    }
  }
}
