import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Hero, Monster, Player, IRaidResult } from '../../models/models';

@Injectable({
  providedIn: OneDeviceModule
})
export class RaidService {

  constructor() { }

  public async getResult(
    raider: Player,
    hero: Hero,
    monsters: Monster[]
  ): Promise<IRaidResult> {
    return { 
      raider: raider,
      survived: true
    };
  }
}
