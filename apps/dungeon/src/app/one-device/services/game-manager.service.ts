import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player } from '../../models/player';

@Injectable({
  providedIn: OneDeviceModule
})
export class GameManagerService {

  private players: Player[] = [];

  constructor() { }
  
  public getAmountOfPlayers() {
    return this.players.length;
  }

}
