import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';

import { BiddingService } from './bidding.service';
import { HeroesService } from './heroes.service';
import { UIControllerService } from './uicontroller.service';
import { 
  Player, 
  IHero, 
  heroes, 
  IChoiceRequest, 
  IChoiceResponse
} from '../../models/models';

jest.mock('./heroes.service');
const MockedHeroesService = mocked(HeroesService, true);

jest.mock('./uicontroller.service');
const MockedUIControlleService = mocked(UIControllerService, true);

describe('BiddingServiceService', () => {
  let biddingService: BiddingService;
  let heroesService: HeroesService;
  let uiController: UIControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiddingService, HeroesService, UIControllerService]
    });
    biddingService = TestBed.inject(BiddingService);
    heroesService = TestBed.inject(HeroesService);
    uiController = TestBed.inject(UIControllerService);
  });

  describe('constructor', () => {
    it('should create service', () => {
      expect(biddingService).toBeTruthy();
    });

    it('should ask for an instance of HeroesService', () => {
      expect(MockedHeroesService).toHaveBeenCalled();
    });

    it('should ask for an instance of UIController', () => {
      expect(MockedUIControlleService).toHaveBeenCalled();
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
    let requestChoiceParameter: IChoiceRequest | undefined;

    beforeEach(() => {
      startingPlayer = new Player('first');
      heroUIData = heroes;
      uiController.requestChoice.mockImplementation(
        (request: IChoiceRequest) => {
          requestChoiceParameter = request;
        }
      );
    
      biddingService.chooseHero(startingPlayer);
    });

    afterEach(() => {
      requestChoiceParameter = undefined;
    });

    it('should ask HeroService for heroes', () => {
      expect(heroesService.getHeroes).toHaveBeenCalledTimes(1);
    });

    it('should make a choice requestAction to startingPlayer', () => {
      // tslint:disable-next-line: no-non-null-assertion
      expect(requestChoiceParameter.type).toBe('choice');
    });
  });
});
