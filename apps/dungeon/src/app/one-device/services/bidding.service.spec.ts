import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';

import { BiddingService } from './bidding.service';
import { HeroesService } from './heroes.service';
import { 
  Player, 
  IHero, 
  heroes, 
  IPlayerChoiceRequest, 
  IPlayerActionResponse, 
  IPlayerActionRequest 
} from '../../models/models';

jest.mock('./heroes.service');
const MockedHeroesService = mocked(HeroesService, true);

describe('BiddingServiceService', () => {
  let biddingService: BiddingService;
  let heroesService: HeroesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiddingService, HeroesService]
    });
    biddingService = TestBed.inject(BiddingService);
    heroesService = TestBed.inject(HeroesService);
  });

  describe('constructor', () => {
    it('should create service', () => {
      expect(biddingService).toBeTruthy();
    });

    it('should ask for an instance of HeroesService', () => {
      expect(MockedHeroesService).toHaveBeenCalled();
    });
  });

  describe('startNewRound', () => {
    let chooseHeroSpy: jest.SpyInstance<void, [Player]>;

    beforeEach(() => {
      chooseHeroSpy = jest.spyOn(biddingService, 'chooseHero')
        .mockImplementation((player: Player) => {});
    });

    it('should make starting player choose a hero', () => {
      const startingPlayer = new Player('First');
      biddingService.startNewRound(startingPlayer);
      expect(chooseHeroSpy).toHaveBeenCalledTimes(1);
      expect(chooseHeroSpy).toHaveBeenCalledWith(startingPlayer);
    });
  });

  describe('chooseHero', () => {
    let startingPlayer: Player;
    let heroUIData: IHero[];
    let requestActionSpy: jest.SpyInstance<IPlayerActionResponse, [IPlayerActionRequest]>
    let requestActionParameter: IPlayerActionRequest | undefined;

    beforeEach(() => {
      startingPlayer = new Player('first');
      heroUIData = heroes;
      requestActionSpy = jest.spyOn(startingPlayer, 'requestAction')
        .mockImplementation((request: IPlayerActionRequest) => {
          requestActionParameter = request;
        });
      biddingService.chooseHero(startingPlayer);
    });

    afterEach(() => {
      requestActionParameter = undefined;
    });

    it('should ask HeroService for heroes', () => {
      expect(heroesService.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should make a choice requestAction to startingPlayer', () => {
      // tslint:disable-next-line: no-non-null-assertion
      expect(requestActionParameter.type).toBe('choice');
    });
  });
});
