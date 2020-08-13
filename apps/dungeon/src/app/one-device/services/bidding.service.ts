import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { 
  Player, MonsterView, IEquipment, NotificationRequest,
  DecisionRequest, ChoiceRequest,
  Bidding, BiddingResult, 
  BiddingActionRequest, BidRequest, MonsterAdditionRequest, EquipmentRemovalRequest, 
  BiddingActionResponse, BidResponse, MonsterAdditionResponse, EquipmentRemovalResponse
} from '../../models/models';
import { HeroesService } from './heroes.service';
import { MonstersService } from './monsters.service';
import { PlayersService } from './players.service';
import { UIControllerService } from './uicontroller.service';

@Injectable({
  providedIn: OneDeviceModule
})
export class BiddingService {
  
  private bidding: Bidding | undefined;

  constructor(
    private heroesService: HeroesService,
    private monstersService: MonstersService,
    private playersService: PlayersService,
    private uiController: UIControllerService,
  ) { }

  public async playBidding(
    startingPlayer: Player
  ): Promise<BiddingResult> {
    this.bidding = await this.setBiddingUp(startingPlayer);
    await this.manageBidding();
    return this.bidding.getResult();
  }

  private async setBiddingUp(startingPlayer: Player): Promise<Bidding> {
    const biddingPlayers = this.getActivePlayers();
    const hero = await this.heroesService.chooseHero(startingPlayer);
    const monstersPack = this.monstersService.getMonstersPack();
    return new Bidding(startingPlayer, biddingPlayers, hero, monstersPack);
  }

  private getActivePlayers(): Player[] {
    const players = this.playersService.getPlayersList();
    const activePlayers = players.filter(player => player.active);
    return activePlayers;
  }

  private async manageBidding(): Promise<void> {
    const bidding = this.bidding as Bidding;
    while(bidding.goesOn) {
      const request = bidding.demandNextRequest();
      const response = await this.makeRequest(request);
      const outcome = bidding.onResponse(response);
      if (outcome) this.sendNotification(outcome);
      if (!bidding.activeTurn) {
        const endOfTurnNotification = bidding.endTurn();
        this.sendNotification(endOfTurnNotification);
      }
    }
  }

  private async makeRequest(request: BiddingActionRequest) {
    let response: BiddingActionResponse;

    switch (request.type) {
      case 'bid':
        response = await this.requestBid(request);
        return response;
      case 'add monster':
        response = await this.requestMonsterAddition(request);
        return response;
      case 'remove equipment':
        response = await this.requestEquipmentRemoval(request);
        return response;
      default:
        throw new Error('Unexpected request parameter');
    }
  }

  private async requestBid(request: BidRequest): Promise<BidResponse> {
    const bid = `Stay in bidding phase. Add one monster to the dungeon or drop 
      one piece of hero's equipment.`;

    const withdraw = `Withdraw from this bidding phase if you fear the hero 
      won't make it. Let others take the risk.`;
    
    const decisionRequest: DecisionRequest<null> = {
      player: request.player,
      decision: {
        name: 'Bid',
        content: bid,
        extra: null
      },
      rejection: {
        name: 'Withdraw',
        content: withdraw
      },
    };

    const decision = await this.uiController.requestDecision(decisionRequest);

    return {
      type: 'bid',
      content: decision.response
    };
  }

  private async requestMonsterAddition(request: MonsterAdditionRequest): Promise<MonsterAdditionResponse> {
    const monster = request.content;
    const monsterData: MonsterView = this.monstersService.getViewDataFor(monster.type);

    const decisionRequest: DecisionRequest<MonsterView> = {
      player: request.player,
      decision: {
        name: 'Add Monster',
        content: `Add this ${monster.type} to the dungeon`,
        extra: monsterData
      },
      rejection: {
        name: 'Remove Equipment',
        content: `Remove a piece from hero's equipment`
      }
    };

    const decision = await this.uiController.requestDecision(decisionRequest);
    
    return {
      type: 'add monster',
      content: decision.response
    };
  }

  private async requestEquipmentRemoval(request: EquipmentRemovalRequest): Promise<EquipmentRemovalResponse> {
    const equipment = request.content;
    const equipmentData: IEquipment[] = []//this.equipmentService.getViewDataFor(equipment);

    const choiceRequest: ChoiceRequest<IEquipment> = {
      player: request.player,
      options: equipmentData
    }

    const choice = await this.uiController.requestChoice(choiceRequest);
    const chosenPiece = equipment[choice.response];

    return {
      type: 'remove equipment',
      content: chosenPiece
    };
  }

  private async sendNotification<T>(request: NotificationRequest<T>): Promise<void> {
    const notification = await this.uiController.sendNotification(request);
    if (!notification.notified) throw new Error ('Player could not confirm notification.');
  }
}
