import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player, Hero } from '../../models/models';
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

  public async startNewRound(players: Player[]): Promise<void> {
    players.forEach(player => this.players.push(player));
    const startingPlayer = this.players[0];
    this._hero = await this.heroesService.chooseHero(startingPlayer.name);
  }
}
