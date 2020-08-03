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
    this.validateAmountOfPlayers();
    this.validateNewPlayersName(name);
    
    const player = new Player(name);
    
    this.updatePlayersOrder(player);
    
    this.players.push(player);
    return player;
  }

  public getPlayer(index: number): Player {
    return this.players[index];
  }

  public getPlayersList(): Player[] {
    return this.players.slice(0);
  }

  public getActivePlayersList(): Player[] {
    return this.players.slice(0).filter(player => player.active);
  }

  public getRandomPlayer(): Player {
    const activePlayers = this.getActivePlayersList();
    if (activePlayers.length === 0) throw new Error('There are no players');
    const randomIndex = Math.floor(Math.random() * activePlayers.length);
    const randomPlayer = activePlayers[randomIndex];
    return randomPlayer;
  }

  public isThereAWinner(): boolean {
    const activePlayers = this.getActivePlayersList();
    const someoneHasTwoVictories = 
      activePlayers.some(player => player.victories === 2);
    const thereIsOnlyOneLeft = activePlayers.length === 1;
    return someoneHasTwoVictories || thereIsOnlyOneLeft;
  }

  public getWinner(): Player {
    if (!this.isThereAWinner()) throw new Error('There is no winner yet');

    const activePlayers = this.getActivePlayersList();
    const winner = activePlayers.length === 1
      ? activePlayers[0]
      : activePlayers.find(player => player.victories === 2);
      
    return winner as Player;
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
}
