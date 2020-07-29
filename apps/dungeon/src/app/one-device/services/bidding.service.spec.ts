import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';

import { BiddingService } from './bidding.service';
import { HeroesService } from './heroes.service';
// import { UIControllerService } from './uicontroller.service';
import { Player, Bard, Hero } from '../../models/models';

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
    let players: Player[];

    beforeEach(() => {
      players = [new Player('first'), new Player('second')];
    });

    it('should call heroService.chooseHero with first player', async () => {
      const startingPlayer = players[0];
      await biddingService.startNewRound(players);
      expect(heroesService.chooseHero).toHaveBeenCalledTimes(1);
      expect(heroesService.chooseHero).toHaveBeenCalledWith(startingPlayer.name);
    });

    it('should store return from heroService.chooseHero in getter hero field', async () => {
      const hero = new Bard();
      (heroesService.chooseHero as jest.Mock<Promise<Hero>, [string]>)
        .mockResolvedValue(hero);
      await biddingService.startNewRound(players);
      expect(biddingService.hero).toBe(hero);
    });
  });
});
