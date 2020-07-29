import { Injectable } from '@angular/core';

import { OneDeviceModule } from '../one-device.module';
import { Bard, Mage, Ninja, Princess, heroes, Hero, IChoiceRequest, IHero } from '../../models/models';
import { UIControllerService } from './uicontroller.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class HeroesService {
  private constructors = {
    Bard: Bard,
    Mage: Mage,
    Ninja: Ninja,
    Princess: Princess
  }
  private heroesUIData = heroes;

  constructor(
    private uiController: UIControllerService
  ) { }

  public async chooseHero(playerName: string): Promise<Hero> {
    const request: IChoiceRequest<IHero> = {
      player: playerName,
      options: this.heroesUIData.slice(0)
    };
    const choice = await this.uiController.requestChoice(request);
    const heroName = heroes[choice.response].name;
    const hero: Hero = new this.constructors[heroName]();
    return hero;
  }
}
