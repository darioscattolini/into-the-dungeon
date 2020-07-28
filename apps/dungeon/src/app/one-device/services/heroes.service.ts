import { Injectable } from '@angular/core';

import { OneDeviceModule } from '../one-device.module';
import { Bard, Mage, Ninja, Princess, IDerivedHeroStatic, IHero, heroes, Hero } from '../../models/models';

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

  constructor() { }

  public getHeroesUIData(): IHero[] {
    return this.heroesUIData.slice(0);
  }

  public getHero(heroName: 'Bard' | 'Mage' | 'Ninja' | 'Princess'): Hero {
    return new this.constructors[heroName]();
  }
}
