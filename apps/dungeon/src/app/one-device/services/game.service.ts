import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { PlayersService } from './players.service';
import { Player } from '../../models/models';
import { BiddingService } from './bidding.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class GameService {
    // this is public just for tests
  public players: Player[] | undefined;

  constructor(
    private playersService: PlayersService,
    private biddingService: BiddingService
  ) { }

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
    const players = <Player[]>this.players;
    const randomIndex = Math.floor(Math.random() * players.length);
    const firstPlayer: Player = players[randomIndex];
    while(this.goesOn()) {
      this.biddingService.startNewRound(firstPlayer);
    }
  }
    // this is public just for tests
  public goesOn(): boolean {
    const players = <Player[]>this.players;
    let output = true;
    for (const player of players) {
      if (player.defeats === 2 || player.victories === 2) {
        output = false;
        break;
      }
    }
    return output;
  }
}
