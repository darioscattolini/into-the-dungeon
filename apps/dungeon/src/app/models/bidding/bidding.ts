import { 
  BiddingActionType, BiddingActionRequest, BiddingActionResponse 
} from './bidding-actions';
import { BiddingResult } from './bidding-result';
import { 
  Player, Hero, Monster, Equipment, NotificationRequest 
} from "../models";

export class Bidding {
  public get biddingPlayers() { return this._biddingPlayers.slice(0); }
  private _biddingPlayers: Player[];

  public get currentPlayer() { return this._currentPlayer; }
  private _currentPlayer: Player;
  
  public get hero() { return this._hero; }
  private _hero: Hero;

  public get monstersPackSize() { return this.monstersPack.length; }
  private monstersPack: Monster[];
  
  public get monstersInDungeonAmount() { return this.monstersInDungeon.length; }
  private monstersInDungeon: Monster[] = [];

  public get goesOn() { return this._goesOn; }
  private _goesOn = true;

  public get activeTurn() { return this._activeTurn; }
  private _activeTurn = true;

  private currentAction: BiddingActionType = 'bid';

  private responsePending = false;
  
  constructor(
    biddingPlayers: Player[],
    startingPlayer: Player,
    hero:           Hero,
    monstersPack:   Monster[]
  ) {
    this._biddingPlayers = biddingPlayers;
    this._currentPlayer = startingPlayer;
    this._hero = hero;
    this.monstersPack = monstersPack;
  }

  public demandNextRequest(): BiddingActionRequest {  
    if (this.responsePending) {
      throw new Error('A user response to a previous request is pending.');
    }

    if (!this._activeTurn) {
      throw new Error('Call to nextTurn necessary before requesting action');
    }

    const request: Partial<BiddingActionRequest> = {
      player: this._currentPlayer,
    }

    switch (this.currentAction) {
      case 'bid':
        request.type = 'bid';
        request.content = null;
        break;
      case 'add monster':
        request.type = 'add monster';
        request.content = this.pickLastMonster();
        break;
      case 'remove equipment':
        request.type = 'remove equipment';
        request.content = this.getHeroEquipment();
        break;
      default:
        throw Error('Unexpected request type');
    }

    this.responsePending = true;
    return request as BiddingActionRequest;
  }

  public onResponse(
    response: BiddingActionResponse
  ): NotificationRequest<Monster> | undefined {
    if (!this.responsePending) {
      throw new Error('A user action must be previously requested.');
    }

    if (response.type !== this.currentAction) {
      throw new Error(`A response of ${this.currentAction} type was expected.`);
    }

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

  public endTurn(): NotificationRequest<null> {
    if (this._activeTurn) {
      throw new Error(`${this._currentPlayer.name} is still playing.`);
    }

    const request: NotificationRequest<null> = {
      player: this._currentPlayer,
      notification: {
        content: '',
        extra: null
      }
    };

    if (this.monstersPackSize === 0) {
      this._goesOn = false;
      request.notification.content = 
        'There are no more monsters to add. You advance to raid phase.';
      return request;
    }

    this._currentPlayer = this.getNextBiddingPlayer();
    request.player = this._currentPlayer;

    if (this._biddingPlayers.length === 1) {
      if (this._currentPlayer !== this.getLastBiddingPlayer()) {
        throw new Error('Something went wrong: last player inconsistency.');
      }

      this._goesOn = false;
      request.notification.content = 
        'You are the last player standing in bidding phase.';
    } else {
      this._activeTurn = true;
      this.currentAction = 'bid';  
      request.notification.content = 'It is your turn.';
    }

    return request;
  }

  public getResult(): BiddingResult {
    if (this._goesOn) throw new Error ('Bidding phase has not ended yet.');
    
    const result: BiddingResult = {
      raider: this.getLastBiddingPlayer(),
      hero: this._hero,
      enemies: this.monstersInDungeon
    }
    
    return result;
  }

  private manageBidResponse(
    response: boolean
  ): NotificationRequest<Monster> | undefined {
    if (response) {
      if (this._hero.equipmentSize === 0) {
        const forciblyAdded = this.addMonsterToDungeon();
        this._activeTurn = false;
        return {
          player: this._currentPlayer,
          notification: {
            content: `Hero has no equipment.
              You have no choice but to include this monster in dungeon.`,
            extra: forciblyAdded
          }
        };
      } else {
        this.currentAction = 'add monster';
      }
    } else {
      this.removeCurrentPlayer();
      this._activeTurn = false;
    }
  }

  private manageMonsterAdditionResponse(response: boolean): void {
    if (this.monstersPack.length === 0) {
      throw new Error('There are no monsters in pack, bidding should have ended.');
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
      throw new Error('Hero has no equipment, method should not have been called.');
    }

    this._hero.discardEquipment(equipment);
    this._activeTurn = false;
  }

  private addMonsterToDungeon(): Monster {
    const monster = this.monstersPack.pop() as Monster;
    this.monstersInDungeon.push(monster);
    return monster;
  }

  private pickLastMonster(): Monster {
    return this.monstersPack[this.monstersPack.length - 1];
  }

  private getHeroEquipment(): Equipment[] {
    return this._hero.equipment.slice();
  }

  private removeCurrentPlayer(): void {
    if (this._biddingPlayers.length === 1) {
      throw new Error('There is only one player left, bidding should have ended.');
    }
    const playerIndex = this._biddingPlayers.indexOf(this._currentPlayer);
    this._biddingPlayers.splice(playerIndex, 1);
  }

  private getNextBiddingPlayer(): Player {
    let nextPlayer = this._currentPlayer.nextPlayer as Player;

    while (!this._biddingPlayers.includes(nextPlayer)) {
      nextPlayer = nextPlayer.nextPlayer as Player;
    }
    
    return nextPlayer;
  }

  private getLastBiddingPlayer(): Player {
    if (this._biddingPlayers.length > 1) {
      throw new Error('There is still more than one player bidding.');
    }

    return this._biddingPlayers[0];
  }
}
