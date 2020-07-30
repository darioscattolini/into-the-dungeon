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
  private players: Player[] = [];

  constructor(
    private heroesService: HeroesService,
    // private uiController: UIControllerService,
  ) { }

  public get hero() {
    return this._hero;
  }

  public async getResult(
    players: Player[], 
    firstPlayerName: string
  ): Promise<IBiddingResult> {
    if (!players.some(player => player.name === firstPlayerName)) {
      throw new Error('Received players list has no player with received name');
    }
    players.forEach(player => this.players.push(player));
    this._hero = await this.heroesService.chooseHero(firstPlayerName);
    // ...
    return {
      raider: 'SomePlayer',
      hero: this._hero,
      enemies: []
    }
  }

  
}
