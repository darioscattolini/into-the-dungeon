import { Injectable } from '@angular/core';

import { OneDeviceModule } from '../one-device.module';
import { 
  Bard, Mage, Ninja, Princess, Hero, HeroType, HeroView, HeroViewMap,
  ChoiceRequest, Player, 
} from '../../models/models';
import { UIControllerService } from './uicontroller.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class HeroesService {
  private constructors = {
    bard: Bard,
    mage: Mage,
    ninja: Ninja,
    princess: Princess
  };

  private readonly ViewMap = HeroViewMap;

  constructor(
    private uiController: UIControllerService
  ) { }

  public async chooseHero(player: Player): Promise<Hero> {
    const options = this.getHeroOptions();
    const request: ChoiceRequest<HeroView> = { player, options };
    const choice = await this.uiController.requestChoice(request); 
    const heroName = options[choice.response].name;
    const hero = this.createHero(heroName);
    return hero;
  }

  private getHeroOptions(): HeroView[] {
    const { bard, mage, ninja, princess } = this.ViewMap;
    return [ bard, mage, ninja, princess ];
  }

  private createHero(heroName: HeroType): Hero {
    return new this.constructors[heroName]();
  }
}
