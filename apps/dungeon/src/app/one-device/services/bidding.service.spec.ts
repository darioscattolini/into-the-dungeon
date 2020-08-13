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

describe.skip('BiddingServiceService', () => {
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
    MockedPlayersService.mockClear();
    // MockedUIControllerService.mockClear();
  });
  
  test('it is created', () => {
    expect(biddingService).toBeTruthy();
  });

  /*test('it has no hero at first', () => {
    expect(biddingService.hero).toBeUndefined();
  });*/

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

    /* describe('loop condition', async () => {
      let firstPlayer: Player;
      let secondPlayer: Player;
      let thirdPlayer: Player;

      beforeEach(() => {
        firstPlayer = startingPlayer;
        secondPlayer = startingPlayer.nextPlayer as Player;
        thirdPlayer = secondPlayer.nextPlayer as Player;
      });

      test('it runs first for startingPlayer', async () => {
        expect.assertions(1);

        await biddingService.getResult(startingPlayer);


      });

      test('it runs second for startingPlayers next player', async () => {});

      test('it runs third for second players next player', async () => {});

      test('it skips non active players', async () => {});

      test('it runs until there is only one player bidding', async () => {});
    }); */

    test('it calls heroService.chooseHero once', async () => {
      expect.assertions(1);

      await biddingService.playBidding(startingPlayer);

      expect(heroesService.chooseHero).toHaveBeenCalledTimes(1);
    });

    test('it calls heroService.chooseHero with startingPlayer', async () => {
      expect.assertions(1);

      await biddingService.playBidding(startingPlayer);

      expect(heroesService.chooseHero).toHaveBeenCalledWith(startingPlayer);
    });

    /*test('it stores chosenHero in readable field', async () => {
      expect.assertions(1);

      await biddingService.playBidding(startingPlayer);

      expect(biddingService.hero).toBe(heroStub);
    });*/

    test('it calls playersService.getPlayersList once', async () => {
      expect.assertions(1);
      await biddingService.playBidding(startingPlayer);
      expect(playersService.getPlayersList).toHaveBeenCalledTimes(1);
    });

    test('it calls monstersService.getMonstersPack once', async () => {
      expect.assertions(1);
      await biddingService.playBidding(startingPlayer);
      expect(monstersService.getMonstersPack).toHaveBeenCalledTimes(1);
    });
  });
});
