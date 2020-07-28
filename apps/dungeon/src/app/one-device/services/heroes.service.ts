import { Injectable } from '@angular/core';

import { OneDeviceModule } from '../one-device.module';
import { Bard, Mage, Ninja, Princess, IDerivedHeroStatic, IHero, heroes } from '../../models/models';

@Injectable({
  providedIn: OneDeviceModule
})
export class HeroesService {
  private heroClasses: IDerivedHeroStatic[] = [
    Bard,
    Mage,
    Ninja,
    Princess
  ];
  private heroesUIData = heroes;

  constructor() { }

  public getHeroesUIData(): IHero[] {
    return this.heroesUIData.slice(0);
  }
}
