import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player, Hero, Monster, IBiddingResult } from '../../models/models';
import { HeroesService } from './heroes.service';
import { MonstersService } from './monsters.service';
import { PlayersService } from './players.service';
// import { UIControllerService } from './uicontroller.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  private _hero: Hero | undefined;
  private monstersPack: Monster[] | undefined;
  private players: Player[] | undefined;

  constructor(
    private heroesService: HeroesService,
    private monstersService: MonstersService,
    private playersService: PlayersService
    // private uiController: UIControllerService,
  ) { }

  public get hero() {
    return this._hero;
  }

  public async getResult(
    startingPlayer: Player
  ): Promise<IBiddingResult> {
    this._hero = await this.heroesService.chooseHero(startingPlayer);
    this.players = this.getPlayers();
    this.monstersPack = this.monstersService.getMonstersPack();
    // ...
    return {
      raider: startingPlayer,
      hero: this._hero,
      enemies: []
    }
  }

  private getPlayers(): Player[] {
    return this.playersService.getPlayersList()
      .filter(player => player.active);
  }
}
