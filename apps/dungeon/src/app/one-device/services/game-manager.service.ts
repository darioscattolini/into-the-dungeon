import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player } from '../../models/player';

@Injectable({
  providedIn: OneDeviceModule
})
export class GameManagerService {

  private players: Player[] = [];

  constructor() { }
  
  public getAmountOfPlayers(): number {
    return this.players.length;
  }

  public addPlayer(name: string): Player {
    if(this.getAmountOfPlayers() === 4) {
      throw new Error('There can only be four players in this game');
    }
    const player = new Player(name);
    this.players.push(player);
    return player;
  }

  public getPlayer(index: number): Player {
    return this.players[index];
  }

}
