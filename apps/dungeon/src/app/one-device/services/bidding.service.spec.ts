import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';

import { BiddingService } from './bidding.service';
import { HeroesService } from './heroes.service';
import { MonstersService } from './monsters.service';
import { PlayersService } from './players.service';
// import { UIControllerService } from './uicontroller.service';
import { Player, Hero } from '../../models/models';
import { noEquipHeroStub } from '../../mocks/hero.mocks';

jest.mock('./heroes.service');
const MockedHeroesService = mocked(HeroesService, true);

jest.mock('./monsters.service');
const MockedMonstersService = mocked(MonstersService, true);

jest.mock('./players.service');
const MockedPlayersService = mocked(PlayersService, true);

// jest.mock('./uicontroller.service');
// const MockedUIControllerService = mocked(UIControllerService, true);

function setUpPlayers(): Player[] {
  const first  = new Player('John');
  const second = new Player('Anna');
  const third  = new Player ('Julia');

    // set order
  first.nextPlayer  = second;
  second.nextPlayer = third;
  third.nextPlayer  = first;

    // make second inactive
  second.dieInDungeon();
  second.dieInDungeon();
  return [ first, second, third ];
}

describe('BiddingServiceService', () => {
  let biddingService:  BiddingService;
  let heroesService:   HeroesService;
  let monstersService: MonstersService;
  let playersService:  PlayersService;
  // let uiController: UIControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BiddingService, 
        HeroesService, 
        MonstersService, 
        PlayersService
        /* UIControllerService */
      ]
    });
    biddingService  = TestBed.inject(BiddingService);
    heroesService   = TestBed.inject(HeroesService);
    monstersService = TestBed.inject(MonstersService);
    playersService  = TestBed.inject(PlayersService);
    // uiController = TestBed.inject(UIControllerService);
  });

  afterEach(() => {
    MockedHeroesService.mockClear();
    MockedMonstersService.mockClear();
    MockedPlayersService.mockClear();
    // MockedUIControllerService.mockClear();
  });
  
  test('it is created', () => {
    expect(biddingService).toBeTruthy();
  });

  test('it has no hero at first', () => {
    expect(biddingService.hero).toBeUndefined();
  });

  describe('getResult', () => {
    let activePlayers: Player[];
    let startingPlayer: Player;
    let heroStub: Hero;

    beforeEach(() => {
      activePlayers = setUpPlayers();
      heroStub = Object.assign(noEquipHeroStub);
      
      const randomIndex = Math.floor(Math.random() * activePlayers.length);
      startingPlayer = activePlayers[randomIndex];

      (playersService.getPlayersList as jest.Mock<Player[], []>)
        .mockReturnValue(activePlayers);

      (heroesService.chooseHero as jest.Mock<Promise<Hero>, [Player]>)
        .mockResolvedValue(heroStub);
    });

    describe('players setup', () => {
      test('it works as expected', () => {
        expect(activePlayers).toHaveLength(3);
        expect(activePlayers[0].nextPlayer).toBe(activePlayers[1]);
        expect(activePlayers[1].nextPlayer).toBe(activePlayers[2]);
        expect(activePlayers[2].nextPlayer).toBe(activePlayers[0]);
        expect(activePlayers[0].active).toBe(true);
        expect(activePlayers[1].active).toBe(false);
        expect(activePlayers[2].active).toBe(true);
      });
    });

    test('it calls heroService.chooseHero once', async () => {
      expect.assertions(1);

      await biddingService.getResult(startingPlayer);

      expect(heroesService.chooseHero).toHaveBeenCalledTimes(1);
    });

    test('it calls heroService.chooseHero with startingPlayer', async () => {
      expect.assertions(1);

      await biddingService.getResult(startingPlayer);

      expect(heroesService.chooseHero).toHaveBeenCalledWith(startingPlayer);
    });

    test('it stores chosenHero in readable field', async () => {
      expect.assertions(1);

      await biddingService.getResult(startingPlayer);

      expect(biddingService.hero).toBe(heroStub);
    });

    test('it calls playersService.getPlayersList once', async () => {
      expect.assertions(1);
      await biddingService.getResult(startingPlayer);
      expect(playersService.getPlayersList).toHaveBeenCalledTimes(1);
    });

    test('it calls monstersService.getMonstersPack once', async () => {
      expect.assertions(1);
      await biddingService.getResult(startingPlayer);
      expect(monstersService.getMonstersPack).toHaveBeenCalledTimes(1);
    });
  });
});

/*private async manageRound(firstPlayerName: string) {
    let currentPlayer = firstPlayerName;
    while(this.players.length > 1) {
      // options: see monster or retire
      // uiController.requestChoice()
      // if (retire) get out of array, or perhaps we should keep another actives array, and check for missing nextPlayer
        // currentPlayer = currentPlayer.nextPlayer and continue loop
      // if (monster), monsterService.getMonster()
      // options: add monster or remove equipment
      // uiController.requestChoice()
      // if (addMonster) add monster to monster mace stored in this service
        // currentPlayer = currentPlayer.nextPlayer, and continue loop
      // if (removeEquipment) equipmentService o heroService getEquipData and build options
      // uiController.requestChoice()
      // equipService or heroService process result
      // currentPlayer = currentPlayer.nextPlayer
    }
  }
  
  private getNextBiddingPlayer(player: Player): Player {
    let nextPlayer = player.nextPlayer as Player;
    // tslint:disable-next-line: no-non-null-assertion
    while (!this.players!.includes(nextPlayer)) {
      nextPlayer = nextPlayer.nextPlayer as Player;
    }
    return nextPlayer;
  }
  */