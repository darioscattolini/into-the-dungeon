import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';

import { 
  heroes, IHero, Bard, Mage, Ninja, Princess, 
  IChoiceRequest, IChoiceResponse, Player, HeroType 
} from '../../models/models';
import { HeroesService } from './heroes.service';
import { UIControllerService } from './uicontroller.service';

jest.mock('./uicontroller.service');
const MockedUIController = mocked(UIControllerService, true);
type requestChoiceMock = 
  jest.Mock<Promise<IChoiceResponse>, [IChoiceRequest<IHero>]>;

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let uiController: UIControllerService;

  function makeUserChoose(heroName: HeroType) {
    (uiController.requestChoice as requestChoiceMock)
      .mockImplementation(
        async request => {
          const heroIndex = 
            request.options.findIndex((hero) => hero.name === heroName);
          return { response: heroIndex };
        }
      );
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeroesService, UIControllerService]
    });
    heroesService = TestBed.inject(HeroesService);
    uiController = TestBed.inject(UIControllerService);
  });
  
  describe('constructor', () => {
    it('should create service', () => {
      expect(heroesService).toBeTruthy();
    });
  });

  describe('chooseHero', () => {
    let sentPlayer: Player;

    beforeEach(() => {
      sentPlayer = new Player('john');
    });

    afterEach(() => {
      MockedUIController.mockClear();
    });

    it('should make a requestChoice to player received as parameter', () => {
      let receivedPlayer: Player | undefined;
      (uiController.requestChoice as requestChoiceMock)
        .mockImplementation(async request => {
          receivedPlayer = request.player;
          return { response: 0 };
        });

      heroesService.chooseHero(sentPlayer);
      expect(receivedPlayer).toBe(sentPlayer);
    });

    it('should make a requestChoice passing hero ui data as options', () => {
      const expectedHeroes = [
        heroes.bard, heroes.mage, heroes.ninja, heroes.princess
      ];
      let receivedHeroes: IHero[] | undefined;
      (uiController.requestChoice as requestChoiceMock)
        .mockImplementation(async request => {
          receivedHeroes = request.options;
          return { response: 0 };
        });
      
      heroesService.chooseHero(sentPlayer);
      expect(receivedHeroes).toHaveLength(expectedHeroes.length);
      expect(receivedHeroes)
        .toEqual(expect.arrayContaining(expectedHeroes));
    });

    it('should return a Bard if player chooses Bard', async () => {
      makeUserChoose('bard');
      const hero = await heroesService.chooseHero(sentPlayer);
      expect(hero instanceof Bard).toBe(true);
    });

    it('should return a Mage if player chooses Mage', async () => {
      makeUserChoose('mage');
      const hero = await heroesService.chooseHero(sentPlayer);
      expect(hero instanceof Mage).toBe(true);
    });

    it('should return a Ninja if player chooses Ninja', async () => {
      makeUserChoose('ninja');
      const hero = await heroesService.chooseHero(sentPlayer);
      expect(hero instanceof Ninja).toBe(true);
    });

    it('should return a Princess if player chooses Princess', async () => {
      makeUserChoose('princess');
      const hero = await heroesService.chooseHero(sentPlayer);
      expect(hero instanceof Princess).toBe(true);
    });
  });
});
