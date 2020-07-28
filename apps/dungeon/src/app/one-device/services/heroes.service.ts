import { Injectable } from '@angular/core';

import { OneDeviceModule } from '../one-device.module';
import { Bard, Mage, Ninja, Princess, IDerivedHeroStatic } from '../../models/models';

@Injectable({
  providedIn: OneDeviceModule
})
export class HeroesService {
  private heroes: IDerivedHeroStatic[] = [
    Bard,
    Mage,
    Ninja,
    Princess
  ];

  constructor() { }

  public getHeroes(): IDerivedHeroStatic[] {
    return this.heroes.slice(0);
  }
}
