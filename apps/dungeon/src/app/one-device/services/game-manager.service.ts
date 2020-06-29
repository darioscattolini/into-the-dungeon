import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
// import { Player } from '../../models/player';

@Injectable({
  providedIn: OneDeviceModule
})
export class GameManagerService {

  private players = [];

  constructor() { }
  
  public getAmountOfPlayers(): number {
    return this.players.length;
  }

  public addPlayer(name: string) {
    const player = { name };
    this.players.push(player);
    return player;
  }

  public getPlayer(index: number) {
    return this.players[index];
  }

}
