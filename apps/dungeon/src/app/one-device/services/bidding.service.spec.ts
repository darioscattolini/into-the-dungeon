import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';

import { BiddingService } from './bidding.service';
import { HeroesService } from './heroes.service';
import { UIControllerService } from './uicontroller.service';
import { 
  Player, 
  IHero, 
  heroes, 
  IChoiceRequest, 
  Bard,
  Mage,
  Ninja,
  Princess
} from '../../models/models';

jest.mock('./heroes.service');
const MockedHeroesService = mocked(HeroesService, true);

jest.mock('./uicontroller.service');
const MockedUIControllerService = mocked(UIControllerService, true);

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

  afterEach(() => {
    MockedHeroesService.mockClear();
    MockedUIControllerService.mockClear();
  });

  describe('constructor', () => {
    it('should create service', () => {
      expect(biddingService).toBeTruthy();
    });
  });

  describe('startNewRound', () => {
    let chooseHeroSpy: jest.SpyInstance<Promise<void>, [Player]>;

    beforeEach(() => {
      chooseHeroSpy = jest.spyOn(biddingService, 'chooseHero')
        .mockImplementation(async (player: Player) => {});
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
      startingPlayer = new Player('starting');
      heroUIData = heroes;

      (heroesService.getHeroesUIData as jest.Mock)
        .mockImplementation(() => heroUIData);

      (heroesService.getHero as jest.Mock)
        .mockImplementation((heroName: 'Bard' | 'Mage' | 'Ninja' | 'Princess') => {
          switch(heroName) {
            case('Bard'):
              return new Bard();
            case('Mage'):
              return new Mage();
            case('Ninja'):
              return new Ninja();
            case('Princess'):
              return new Princess();
          }
        });

      (uiController.requestChoice as jest.Mock)
        .mockImplementation((request: IChoiceRequest) => {
          requestChoiceParameter = request;
        });
      });

    afterEach(() => {
      requestChoiceParameter = undefined;
    });

    it('should ask HeroesService for heroes data', () => {
      biddingService.chooseHero(startingPlayer);
      expect(heroesService.getHeroesUIData).toHaveBeenCalledTimes(1);
    });

    it('should make a uiController.requestChoice to startingPlayer', () => {
      biddingService.chooseHero(startingPlayer);
      // tslint:disable-next-line: no-non-null-assertion
      expect(requestChoiceParameter!.player).toBe('starting');
    });

    it('should make a uiController.requestChoice passing hero ui data as options', () => {
      biddingService.chooseHero(startingPlayer);
      // tslint:disable-next-line: no-non-null-assertion
      expect(requestChoiceParameter!.options).toHaveLength(heroUIData.length);
      // tslint:disable-next-line: no-non-null-assertion
      expect(requestChoiceParameter!.options)
        .toEqual(expect.arrayContaining(heroUIData));
    });

    it('should ask HeroesService to build Bard if chosen by player', async () => {
      const bardIndex = heroUIData.findIndex((hero: IHero) => hero.name === 'Bard');

      (uiController.requestChoice as jest.Mock)
        .mockResolvedValue({response: bardIndex});

      await biddingService.chooseHero(startingPlayer);
      
      expect(heroesService.getHero).toHaveBeenNthCalledWith(1, 'Bard');
    });

    it('should ask HeroesService to build Mage if chosen by player', async () => {
      const mageIndex = heroUIData.findIndex((hero: IHero) => hero.name === 'Mage');

      (uiController.requestChoice as jest.Mock)
        .mockResolvedValue({response: mageIndex});

      await biddingService.chooseHero(startingPlayer);

      expect(heroesService.getHero).toHaveBeenNthCalledWith(1, 'Mage');
    });

    it('should ask HeroesService to build Ninja if chosen by player', async () => {
      const ninjaIndex = heroUIData.findIndex((hero: IHero) => hero.name === 'Ninja');

      (uiController.requestChoice as jest.Mock)
        .mockResolvedValue({response: ninjaIndex});

      await biddingService.chooseHero(startingPlayer);

      expect(heroesService.getHero).toHaveBeenNthCalledWith(1, 'Ninja');
    });

    it('should ask HeroesService to build Princess if chosen by player', async () => {
      const princessIndex = heroUIData.findIndex((hero: IHero) => hero.name === 'Princess');

      (uiController.requestChoice as jest.Mock)
        .mockResolvedValue({response: princessIndex});
      
      await biddingService.chooseHero(startingPlayer);
      
      expect(heroesService.getHero).toHaveBeenNthCalledWith(1, 'Princess');
    });

    it('should store built Bard in getter hero field', async () => {
      const bardIndex = heroUIData.findIndex((hero: IHero) => hero.name === 'Bard');

      (uiController.requestChoice as jest.Mock)
        .mockResolvedValue({response: bardIndex});

      await biddingService.chooseHero(startingPlayer);
      
      expect(biddingService.hero instanceof Bard).toBe(true);
    });

    it('should store built Mage in getter hero field', async () => {
      const mageIndex = heroUIData.findIndex((hero: IHero) => hero.name === 'Mage');

      (uiController.requestChoice as jest.Mock)
        .mockResolvedValue({response: mageIndex});

      await biddingService.chooseHero(startingPlayer);
      
      expect(biddingService.hero instanceof Mage).toBe(true);
    });

    it('should store built Ninja in getter hero field', async () => {
      const ninjaIndex = heroUIData.findIndex((hero: IHero) => hero.name === 'Ninja');

      (uiController.requestChoice as jest.Mock)
        .mockResolvedValue({response: ninjaIndex});

      await biddingService.chooseHero(startingPlayer);
      
      expect(biddingService.hero instanceof Ninja).toBe(true);
    });

    it('should store built Princess in getter hero field', async () => {
      const princessIndex = heroUIData.findIndex((hero: IHero) => hero.name === 'Princess');

      (uiController.requestChoice as jest.Mock)
        .mockResolvedValue({response: princessIndex});

      await biddingService.chooseHero(startingPlayer);
      
      expect(biddingService.hero instanceof Princess).toBe(true);
    });
  });
});
