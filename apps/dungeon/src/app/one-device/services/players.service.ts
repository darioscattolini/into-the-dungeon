import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { Player } from '../../models/player/player';

@Injectable({
  providedIn: OneDeviceModule
})
export class PlayersService {

  private players: Player[] = [];
  private inGamePlayers: Player[] = [];

  constructor() { }
    
  public getAmountOfPlayers(): number {
    return this.players.length;
  }

  public addPlayer(name: string): Player {
    this.validateAmountOfPlayers();
    this.validateNewPlayersName(name);
    
    const player = new Player(name);
    
    this.updatePlayersOrder(player);
    
    this.players.push(player);
    this.inGamePlayers.push(player);
    return player;
  }

  public getPlayer(index: number): Player {
    return this.players[index];
  }

  public getPlayersList(): Player[] {
    return this.players.slice(0);
  }

  public getRandomPlayer(): Player {
    if (this.players.length === 0) throw new Error('There are no players');
    const randomIndex = Math.floor(Math.random() * this.players.length);
    const randomPlayer = this.players[randomIndex];
    return randomPlayer;
  }

  public isThereAWinner(): boolean {
    this.takeLosersOut();
    const someoneHasTwoVictories = 
      this.inGamePlayers.some(player => player.victories === 2);
    const thereIsOnlyOneLeft = this.inGamePlayers.length === 1;
    return someoneHasTwoVictories || thereIsOnlyOneLeft;
  }

  private validateAmountOfPlayers(): void {
    if (this.getAmountOfPlayers() === 4) {
      throw new Error('There can only be four players in this game');
    }
  }

  private validateNewPlayersName(name: string): void {
    for (const player of this.players) {
      if (player.name === name) {
        throw new Error(`There can only be one player named ${name}`);
      }
    }
  }

  private updatePlayersOrder(newPlayer: Player): void {
    if (this.players.length > 0) {
      const lastPlayer = this.players[this.players.length - 1];
      lastPlayer.nextPlayer = newPlayer;
      newPlayer.nextPlayer = this.players[0];
    }
  }

  private takeLosersOut(): void {
    for (let i = 0; i < this.inGamePlayers.length; i++) {
      const player = this.inGamePlayers[i];
      if (player.defeats === 2) {
        this.inGamePlayers.splice(i, 1);
      }
    }
  }
}
