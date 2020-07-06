import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { PlayersService } from './players.service';
import { Player } from '../../models/player';

@Injectable({
  providedIn: OneDeviceModule
})
export class GameService {
    // this is public just for tests
  public players: Player[];

  constructor(private playersService: PlayersService) { }

  public start(): void {
    const players = this.playersService.getPlayersList();
    if (players.length < 2) {
      throw new Error('There must be at least two players to start the game');
    }
    this.players = players;
    this.manage();
  }
    // this is public just for tests
  public manage(): void {
    while(this.goesOn()) {

    }
  }

  public goesOn(): boolean {
    let output = true;
    for (const player of this.players) {
      if (player.defeats === 2 || player.victories === 2) {
        output = false;
        break;
      }
    }
    return output;
  }
}
