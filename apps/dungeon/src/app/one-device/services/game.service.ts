import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { PlayersService } from './players.service';
import { Player } from '../../models/player';

@Injectable({
  providedIn: OneDeviceModule
})
export class GameService {

  public players: Player[];

  constructor(private playersManager: PlayersService) { }

  public start() {
    const players = this.playersManager.getPlayersList();
    if (players.length < 2) {
      throw new Error('There must be at least two players to start the game');
    }
    this.players = players;
  }
}
