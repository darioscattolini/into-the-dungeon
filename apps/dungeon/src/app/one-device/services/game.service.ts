import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { PlayersService } from './players.service';
import { Player, IRaidResult, IGameResult } from '../../models/models';
import { BiddingService } from './bidding.service';
import { RaidService } from './raid.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class GameService {

  constructor(
    private playersService: PlayersService,
    private biddingService: BiddingService,
    private raidService: RaidService
  ) { }

  public async play(): Promise<void> {
    this.verifyAmountOfPlayers();
    let startingPlayer = this.playersService.getRandomPlayer();
    
    while(this.goesOn()) {
      const { raider, hero, enemies } = 
        await this.biddingService.getResult(startingPlayer);
            
      const raidResult = 
        await this.raidService.getResult(raider, hero, enemies);
      
        this.computeRaidResult(raidResult);
      
        startingPlayer = raider as Player;
    }
  }

  private verifyAmountOfPlayers(): void {
    const amountOfPlayers = this.playersService.getAmountOfPlayers();
    if (amountOfPlayers < 2) {
      throw new Error('There must be at least two players to start the game');
    }
    if (amountOfPlayers > 4) {
      throw new Error('There cannot be more than 5 players');
    }
  }

  private goesOn(): boolean {
    const thereIsAWinner = this.playersService.isThereAWinner();
    return !thereIsAWinner;
  }

  private computeRaidResult(raidResult: IRaidResult): void {
    if (raidResult.survived) raidResult.raider.surviveDungeon();
      else raidResult.raider.dieInDungeon();
  }
}
