import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player, Hero } from '../../models/models';
import { HeroesService } from './heroes.service';
import { UIControllerService } from './uicontroller.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  private _hero: Hero | undefined;

  constructor(
    private heroesService: HeroesService,
    private uiController: UIControllerService
  ) { }

  public get hero() {
    return this._hero;
  }

  public startNewRound(startingPlayer: Player): void {
    this.chooseHero(startingPlayer);
  }

  public async chooseHero(startingPlayer: Player): Promise<void> {
    const heroes = this.heroesService.getHeroesUIData();

    const choice = await this.uiController.requestChoice({
      player: startingPlayer.name,
      options: heroes
    });

    const chosenHero = heroes[choice.response].name;

    this._hero = this.heroesService.getHero(chosenHero);
  }
}
