import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';

import { 
  heroes, IHero, Bard, Mage, Ninja, Princess, 
  IChoiceRequest, IChoiceResponse 
} from '../../models/models';
import { HeroesService } from './heroes.service';
import { UIControllerService } from './uicontroller.service';

jest.mock('./uicontroller.service');
const MockedUIController = mocked(UIControllerService, true);
type requestChoiceMock = jest.Mock<Promise<IChoiceResponse>, [IChoiceRequest<IHero>]>;

describe('HeroesService', () => {
  let heroesService: HeroesService;
  let uiController: UIControllerService;

  function makeUserChoose(heroName: 'Bard' | 'Mage' | 'Ninja' | 'Princess') {
    (uiController.requestChoice as requestChoiceMock)
      .mockImplementation(
        async request => {
          const heroIndex = request.options.findIndex((hero) => hero.name === heroName);
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
          
    afterEach(() => {
      MockedUIController.mockClear();
    });

    it('should make a uiController.requestChoice to player received as parameter', () => {
      let receivedName: string | undefined;
      (uiController.requestChoice as requestChoiceMock)
        .mockImplementation(async request => {
          receivedName = request.player;
          return { response: 0 };
        });

      heroesService.chooseHero('John Smith');
      expect(receivedName).toBe('John Smith');
    });

    it('should make a uiController.requestChoice passing hero ui data as options', () => {
      const expectedHeroes = heroes;
      let receivedHeroes: IHero[] | undefined;
      (uiController.requestChoice as requestChoiceMock)
        .mockImplementation(async request => {
          receivedHeroes = request.options;
          return { response: 0 };
        });
      
      heroesService.chooseHero('John Smith');
      expect(receivedHeroes).toHaveLength(expectedHeroes.length);
      expect(receivedHeroes)
        .toEqual(expect.arrayContaining(expectedHeroes));
    });

    it('should return an instance of Bard if player chooses Bard', async () => {
      makeUserChoose('Bard');
      const hero = await heroesService.chooseHero('John Smith');
      expect(hero instanceof Bard).toBe(true);
    });

    it('should return an instance of Mage if player chooses Mage', async () => {
      makeUserChoose('Mage');
      const hero = await heroesService.chooseHero('John Smith');
      expect(hero instanceof Mage).toBe(true);
    });

    it('should return an instance of Ninja if player chooses Ninja', async () => {
      makeUserChoose('Ninja');
      const hero = await heroesService.chooseHero('John Smith');
      expect(hero instanceof Ninja).toBe(true);
    });

    it('should return an instance of Princess if player chooses Princess', async () => {
      makeUserChoose('Princess');
      const hero = await heroesService.chooseHero('John Smith');
      expect(hero instanceof Princess).toBe(true);
    });
  });
});
