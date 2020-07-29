import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player } from '../../models/player/player';

@Injectable({
  providedIn: OneDeviceModule
})
export class PlayersService {

  private players: Player[] = [];

  constructor() { }
    
  public getAmountOfPlayers(): number {
    return this.players.length;
  }

  public addPlayer(name: string): Player {
    if (this.getAmountOfPlayers() === 4) {
      throw new Error('There can only be four players in this game');
    }

    // tslint:disable-next-line: no-shadowed-variable
    for (const player of this.players) {
      if (player.name === name) throw new Error(`There can only be one player named ${name}`);
    }

    const player = new Player(name);
    
    if (this.players.length > 0) {
      this.players[this.players.length - 1].nextPlayer = player;
      player.nextPlayer = this.players[0];
    }
    
    this.players.push(player);
    return player;
  }

  public getPlayer(index: number): Player {
    return this.players[index];
  }

  public getPlayersList(): Player[] {
    return this.players.slice(0);
  }
}
