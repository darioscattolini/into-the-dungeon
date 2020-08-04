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
  first.nextPlayer  = second;
  second.nextPlayer = third;
  third.nextPlayer  = first;
  return [ first, second, third ];
}

describe('BiddingServiceService', () => {
  let biddingService:  BiddingService;
  let heroesService:   HeroesService;
  let monstersService: MonstersService;
  let playersService:  PlayersService;
  // let uiController: UIControllerService;

  let startingPlayers: Player[];

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

    startingPlayers = setUpPlayers();
  });

  afterEach(() => {
    MockedHeroesService.mockClear();
    MockedMonstersService.mockClear();
    MockedPlayersService.mockClear();
    // MockedUIControllerService.mockClear();
  });
  
  it('should be created', () => {
    expect(biddingService).toBeTruthy();
  });

  it('should have no hero at first', () => {
    expect(biddingService.hero).toBeUndefined();
  });

  describe('getResult', () => {
    let startingPlayer: Player;

    beforeEach(() => {
      startingPlayer = new Player('John');
    });

    it('should call heroService.chooseHero once', async () => {
      await biddingService.getResult(startingPlayer);
      expect(heroesService.chooseHero).toHaveBeenCalledTimes(1);
    });

    it('should call heroService.chooseHero with startingPlayer name', async () => {
      await biddingService.getResult(startingPlayer);
      expect(heroesService.chooseHero).toHaveBeenCalledWith(startingPlayer.name);
    });

    it('should store heroService.chooseHero return in hero field', async () => {
      const hero = noEquipHeroStub;
      (heroesService.chooseHero as jest.Mock<Promise<Hero>, [string]>)
        .mockResolvedValue(hero);
      await biddingService.getResult(startingPlayer);
      expect(biddingService.hero).toBe(hero);
    });

    it('should call playersService.getPlayersList once', async () => {
      await biddingService.getResult(startingPlayer);
      expect(playersService.getPlayersList).toHaveBeenCalledTimes(1);
    });

    it('should call monstersService.getMonstersPack once', async () => {
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
  }*/