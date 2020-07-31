import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';

import { BiddingService } from './bidding.service';
import { HeroesService } from './heroes.service';
// import { UIControllerService } from './uicontroller.service';
import { Player, Hero } from '../../models/models';
import { noEquipHeroStub } from '../../models/mocks';

jest.mock('./heroes.service');
const MockedHeroesService = mocked(HeroesService, true);

// jest.mock('./uicontroller.service');
// const MockedUIControllerService = mocked(UIControllerService, true);

describe('BiddingServiceService', () => {
  let biddingService: BiddingService;
  let heroesService: HeroesService;
  // let uiController: UIControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiddingService, HeroesService, /* UIControllerService */]
    });
    biddingService = TestBed.inject(BiddingService);
    heroesService = TestBed.inject(HeroesService);
    // uiController = TestBed.inject(UIControllerService);
  });

  afterEach(() => {
    MockedHeroesService.mockClear();
    // MockedUIControllerService.mockClear();
  });
  it('should be created', () => {
    expect(biddingService).toBeTruthy();
  });

  it('should have no hero at first', () => {
    expect(biddingService.hero).toBeUndefined();
  });

  describe('startNewRound', () => {
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