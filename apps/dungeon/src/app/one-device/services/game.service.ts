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
    this.players = this.playersManager.getPlayersList();
  }
}
