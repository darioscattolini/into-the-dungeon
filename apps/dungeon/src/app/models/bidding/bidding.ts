import { 
  BiddingActionType, BiddingActionRequest, BiddingActionResponse 
} from './bidding-actions';
import { BiddingResult } from './bidding-result';
import { 
  Player, Hero, Monster, Equipment, NotificationRequest 
} from "../models";

export class Bidding {
  public get currentBiddingPlayer() { return this._currentBiddingPlayer; }
  private _currentBiddingPlayer: Player;
  
  public get hero() { return this._hero; }
  private _hero: Hero;

  public get goesOn() { return this._goesOn; }
  private _goesOn = true;

  public get activeTurn() { return this._activeTurn; }
  private _activeTurn = false;

  private biddingPlayers: Player[];
  private monstersPack: Monster[];
  private monstersInDungeon: Monster[] = [];

  private currentAction: BiddingActionType = 'bid';
  private responsePending = false;
  
  constructor(
    startingPlayer: Player,
    biddingPlayers: Player[],
    hero: Hero,
    monstersPack: Monster[]
  ) {
    this._currentBiddingPlayer = startingPlayer;
    this._hero = hero;
    this.biddingPlayers = biddingPlayers;
    this.monstersPack = monstersPack;
  }

  public demandNextRequest(): BiddingActionRequest {  
    if (this.responsePending) throw new Error('A user response to previous request is pending');
    if (!this._activeTurn) throw new Error('A call to nextTurn is necessary before requesting action');
    switch (this.currentAction) {
      case 'bid':
        this.responsePending = true;
        return { type: 'bid', player: this._currentBiddingPlayer, content: null };
      case 'add monster':
        this.responsePending = true;
        return { type: 'add monster', player: this._currentBiddingPlayer, content: this.pickLastMonster() };
      case 'remove equipment':
        this.responsePending = true;
        return { type: 'remove equipment', player: this._currentBiddingPlayer, content: this.pickHeroEquipment() };
      default:
        throw Error('Unexpected request type');
    }
  }

  public onResponse(response: BiddingActionResponse): NotificationRequest<Monster> | undefined {
    if (response.type !== this.currentAction) throw new Error(
      `A response of ${this.currentAction} type was expected`
    );
    let outcome: NotificationRequest<Monster> | undefined;
    switch (response.type) {
      case 'bid':
        outcome = this.manageBidResponse(response.content);
        break; 
      case 'add monster':
        this.manageMonsterAdditionResponse(response.content);
        break;
      case 'remove equipment':
        this.removeEquipment(response.content);
        break;
    }
    this.responsePending = false;
    return outcome;
  }

  public getResult(): BiddingResult {
    if (this._goesOn) throw new Error ('Bidding phase has not ended yet');
    
    const raider = this.biddingPlayers[0];
    const hero = this._hero;
    const enemies = this.monstersInDungeon;
    
    return { raider, hero, enemies };
  }

  public endTurn(): NotificationRequest<null> {
    if (this._activeTurn) throw new Error(`${this._currentBiddingPlayer.name} is still playing`);

    const output: NotificationRequest<null> = {
      player: this._currentBiddingPlayer,
      notification: {
        content: '',
        extra: null
      }
    };

    if (this.monstersPack.length === 0) {
      this._goesOn = false;
      output.notification.content = 'Since there are no more monsters to add, you advance to raid phase.';
    }

    this._currentBiddingPlayer = this.getNextBiddingPlayer();
    output.player = this._currentBiddingPlayer;

    if (this.biddingPlayers.length === 1) {
      if (this._currentBiddingPlayer !== this.biddingPlayers[0]) {
        throw new Error('Something went wrong: last player inconsistency');
      }
      this._goesOn = false;
      output.notification.content = 'You are the last player standing in bidding phase.';
    } else {
      this._activeTurn = true;
      this.currentAction = 'bid';  
      output.notification.content = 'It is your turn.';
    }
    return output;
  }

  private manageBidResponse(response: boolean): NotificationRequest<Monster> | undefined {
    let notification: NotificationRequest<Monster> | undefined;
    if (response) {
      if (this._hero.equipmentSize === 0) {
        notification = {
          player: this._currentBiddingPlayer,
          notification: {
            content: 'Since hero has no equipment, you can only add this monster to dungeon',
            extra: this.pickLastMonster()
          }
        };
        this.addMonsterToDungeon();
        this._activeTurn = false;
      } else {
        this.currentAction = 'add monster';
      }
    } else {
      this.removeCurrentPlayer();
      this._activeTurn = false;
    }
    return notification;
  }

  private manageMonsterAdditionResponse(response: boolean): void {
    if (this.monstersPack.length === 0) {
      throw new Error('There are no monsters in pack, this method should not have been called.');
    }

    if (response) {
      this.addMonsterToDungeon();
      this._activeTurn = false;
    } else {
      this.monstersPack.pop();
      this.currentAction = 'remove equipment';
    }
  }

  private removeEquipment(equipment: Equipment): void {
    if (this._hero.equipmentSize === 0) {
      throw new Error('Hero has no equipment, this method should not have been called.');
    }

    this._hero.discardEquipment(equipment);
    this._activeTurn = false;
  }

  private addMonsterToDungeon() {
    const monster = this.monstersPack.pop() as Monster;
    this.monstersInDungeon.push(monster);
  }

  private pickLastMonster(): Monster {
    return this.monstersPack[this.monstersPack.length - 1];
  }

  private pickHeroEquipment(): Equipment[] {
    return this._hero.equipment.slice();
  }

  private removeCurrentPlayer(): void {
    if (this.biddingPlayers.length === 1) throw new Error('There is only one player left');
    const playerIndex = this.biddingPlayers.indexOf(this._currentBiddingPlayer);
    this.biddingPlayers.splice(playerIndex, 1);
  }

  private getNextBiddingPlayer(): Player {
    let nextPlayer = this._currentBiddingPlayer.nextPlayer as Player;

    while (!this.biddingPlayers.includes(nextPlayer)) {
      nextPlayer = nextPlayer.nextPlayer as Player;
    }
    
    return nextPlayer;
  }
}
