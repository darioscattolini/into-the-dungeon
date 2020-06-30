import { Injectable } from '@angular/core';
import { Player } from '../../models/player';

@Injectable({
  providedIn: 'root'
})
export class PlayersManagerService {

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
    this.players.push(player);
    return player;
  }

  public getPlayer(index: number): Player {
    return this.players[index];
  }

  public getPlayersList(): Player[] {
    return this.players;
  }
}
