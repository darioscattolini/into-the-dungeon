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
  
  test('it is created', () => {
    expect(heroesService).toBeTruthy();
  });

  describe('chooseHero', () => {
    let sentPlayer: Player;

    beforeEach(() => {
      sentPlayer = new Player('john');
      (uiController.requestChoice as requestChoiceMock)
        .mockResolvedValue({ response: 0 });
    });

    afterEach(() => {
      MockedUIController.mockClear();
    });

    test('it requests choice from player received as parameter', async () => {
      expect.assertions(1);
      await heroesService.chooseHero(sentPlayer);

      expect(uiController.requestChoice)
        .toHaveBeenCalledWith(expect.objectContaining({player: sentPlayer}));
    });

    test('it requests choice with hero ui data as options', async () => {
      const expectedOptions = [
        heroes.bard, heroes.mage, heroes.ninja, heroes.princess,
      ];

      expect.assertions(1);
      await heroesService.chooseHero(sentPlayer);

      expect(uiController.requestChoice)
        .toHaveBeenCalledWith(expect.objectContaining({
          options: expect.toIncludeSameMembers(expectedOptions)
        }));
    });

    test('it returns a Bard if player chooses Bard', async () => {
      makeUserChoose('bard');

      expect.assertions(1);
      const hero = await heroesService.chooseHero(sentPlayer);

      expect(hero).toBeInstanceOf(Bard);
    });

    test('it returns a Mage if player chooses Mage', async () => {
      makeUserChoose('mage');
      
      expect.assertions(1);
      const hero = await heroesService.chooseHero(sentPlayer);

      expect(hero).toBeInstanceOf(Mage);
    });

    test('it returns a Ninja if player chooses Ninja', async () => {
      makeUserChoose('ninja');

      expect.assertions(1);
      const hero = await heroesService.chooseHero(sentPlayer);

      expect(hero).toBeInstanceOf(Ninja);
    });

    test('it returns a Princess if player chooses Princess', async () => {
      makeUserChoose('princess');

      expect.assertions(1);
      const hero = await heroesService.chooseHero(sentPlayer);

      expect(hero).toBeInstanceOf(Princess);
    });
  });
});
