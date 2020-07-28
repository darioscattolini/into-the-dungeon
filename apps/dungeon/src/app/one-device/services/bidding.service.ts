import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player, IHero } from '../../models/models';
import { HeroesService } from './heroes.service';
import { UIControllerService } from './uicontroller.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {

  constructor(
    private heroesService: HeroesService,
    private uiController: UIControllerService
  ) { }

  public startNewRound(startingPlayer: Player): void {
    this.chooseHero(startingPlayer);
  }

  public async chooseHero(startingPlayer: Player): Promise<void> {
    const heroes = this.heroesService.getHeroesUIData();
    
    await this.uiController.requestChoice({
      player: startingPlayer.name,
      options: heroes
    });
  }
}
