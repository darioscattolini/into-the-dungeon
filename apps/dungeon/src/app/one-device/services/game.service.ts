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
  public players: Player[] = [];

  constructor(
    private playersService: PlayersService,
    private biddingService: BiddingService
  ) { }

  public start(): void {
    const players = this.playersService.getPlayersList();
    if (players.length < 2) {
      throw new Error('There must be at least two players to start the game');
    }
    players.forEach(player => this.players.push(player));
    this.manage();
  }
    // this is public just for tests
  public async manage(): Promise<void> {
    const randomIndex = Math.floor(Math.random() * this.players.length);
    const firstPlayer = this.players[randomIndex];
    const playersCopy = this.players.slice(0);
    while(this.goesOn()) {
      await this.biddingService.startNewRound(playersCopy, firstPlayer.name);
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
