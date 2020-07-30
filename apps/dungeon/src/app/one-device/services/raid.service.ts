import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Hero, Monster, IRaidResult } from '../../models/models';

@Injectable({
  providedIn: OneDeviceModule
})
export class RaidService {

  constructor() { }

  public async getResult(
    playerName: string,
    hero: Hero,
    monsters: Monster[]
  ): Promise<IRaidResult> {
    return { sucess: true };
  }
}
