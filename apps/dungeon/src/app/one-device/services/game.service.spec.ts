import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';
import { GameService } from './game.service';
import { PlayersService } from './players.service';
import { BiddingService } from './bidding.service';
import { RaidService } from './raid.service';
import { UIControllerService } from './uicontroller.service';
import { 
  Player, BiddingResult, RaidResult, Hero, Monster
} from '../../models/models';
import { noEquipHeroStub } from '../../mocks/hero.mocks';

jest.mock('./bidding.service.ts');
const MockedBiddingService = mocked(BiddingService, true);

jest.mock('./raid.service.ts');
const MockedRaidService = mocked(RaidService, true);

jest.mock('./players.service');
const MockedPlayersService = mocked(PlayersService, true);

jest.mock('./uicontroller.service');
const MockedUiController = mocked(UIControllerService, true);

jest.mock('../../models/player/player.ts');

describe('GameService', () => {
  let gameService:    GameService;
  let biddingService: BiddingService;
  let raidService:    RaidService;
  let playersService: PlayersService;
  let uiController:   UIControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GameService, 
        PlayersService, 
        BiddingService, 
        RaidService, 
        UIControllerService
      ]
    });
    gameService     = TestBed.inject(GameService);
    biddingService  = TestBed.inject(BiddingService);
    raidService     = TestBed.inject(RaidService);
    playersService  = TestBed.inject(PlayersService);
    uiController    = TestBed.inject(UIControllerService);
  });

  afterEach(() => {
    MockedPlayersService.mockClear();
    MockedBiddingService.mockClear();
    MockedRaidService.mockClear();
    MockedUiController.mockClear();
  });
  
  test('it is created', () => {
    expect(gameService).toBeTruthy();
  });

  describe.each([
    [0, 'There must be at least two players to start the game'],
    [1, 'There must be at least two players to start the game'],
    [5, 'There cannot be more than 5 players'],
    [Math.floor(Math.random() * 95) + 6, 'There cannot be more than 5 players']
  ])(
    'behaviour with wrong number of players (<2 or >4)', 
    (numberOfPlayers, errorMessage) => {

      beforeEach(() => {
        (playersService.getAmountOfPlayers as jest.Mock<number, []>)
          .mockReturnValue(numberOfPlayers);
      })

      test(`it throws error with ${numberOfPlayers} players`, async () => {
        expect.assertions(1);

        try { await gameService.play(); } 
        catch(error) {
          const catchedMessage = (error as Error).message;
          expect(catchedMessage)
            .toBe(errorMessage);
        }
      });

      test(
        `it does not advance to bidding phase with ${numberOfPlayers} players`, 
        async () => {
          expect.assertions(1);

          try { await gameService.play(); }
          catch { }
          finally {
            expect(biddingService.playBidding).not.toHaveBeenCalled();
          }
        }
      );
  });

  describe('functional behaviour', () => {
    const heroStub: Hero = noEquipHeroStub;
    const monsterPileStub: Monster[] = [];

    beforeEach(() => {
      // getWinner irrelevant mock (just to avoid errors)
      (playersService.getWinner as jest.Mock<Player, []>)
        .mockReturnValue(new Player('winner'));
    });

    describe.each([
      [0], [1], [2], [3]
    ])('loop condition', loopRuns => {
      let playerStub: Player; 
      
      beforeEach(() => {
        playerStub = new Player('Stub');

        // bidding service mock
        (biddingService.playBidding as jest.Mock<Promise<BiddingResult>, [Player]>)
          .mockResolvedValue({
            raider: playerStub, hero: heroStub, enemies: monsterPileStub
          });
        
        // raid service mock
        (raidService.getResult as 
          jest.Mock<Promise<RaidResult>, [Player, Hero, Monster[]]>)
          .mockResolvedValue({ raider: playerStub, survived: true });
        
        // isThereAWinner mock
        let isThereAWinner = 
          (playersService.isThereAWinner as jest.Mock<boolean, []>)
        for (let i = 0; i < loopRuns; i++) {
          isThereAWinner = isThereAWinner.mockReturnValueOnce(false);
        }
        isThereAWinner.mockReturnValueOnce(true); 
      });

      test(`it runs ${loopRuns} times until isThereAWinner false`, async () => {
        expect.assertions(1);

        await gameService.play();

        expect(biddingService.playBidding).toHaveBeenCalledTimes(loopRuns);
      });
    });

    describe('biddingService and raidService calls', () => {
      let randomPlayer: Player;
      let firstRaider: Player;
      let secondRaider: Player;
      let thirdRaider: Player;
      let firstHeroStub: Hero;
      let secondHeroStub: Hero;
      let thirdHeroStub: Hero;
      let firstMonsterPileStub: Monster[];
      let secondMonsterPileStub: Monster[];
      let thirdMonsterPileStub: Monster[];

      beforeEach(() => {
        randomPlayer = new Player('random');
        firstRaider = new Player('first');
        secondRaider = new Player('second');
        thirdRaider = new Player('third');
        firstHeroStub = Object.assign(noEquipHeroStub);
        secondHeroStub = Object.assign(noEquipHeroStub);
        thirdHeroStub = Object.assign(noEquipHeroStub);
        firstMonsterPileStub = [];
        secondMonsterPileStub = [];
        thirdMonsterPileStub = [];

        // loop condition setup: runs three times
        (playersService.isThereAWinner as jest.Mock<boolean, []>)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);

        // random player mock
        (playersService.getRandomPlayer as jest.Mock<Player, []>)
          .mockReturnValue(randomPlayer);
      
        // bidding service mock
        (biddingService.playBidding as jest.Mock<Promise<BiddingResult>, [Player]>)
          .mockResolvedValueOnce({
            raider: firstRaider, 
            hero: firstHeroStub, 
            enemies: firstMonsterPileStub
          }).mockResolvedValueOnce({
            raider: secondRaider, 
            hero: secondHeroStub, 
            enemies: secondMonsterPileStub
          }).mockResolvedValueOnce({
            raider: thirdRaider, 
            hero: thirdHeroStub, 
            enemies: thirdMonsterPileStub
          });

        // raid service mock
        (raidService.getResult as jest.Mock<Promise<RaidResult>, [Player]>)
          .mockResolvedValue({ raider: firstRaider, survived: true });
      });

      test('1st bid is called with playersService.randomPlayer', async () => {
        expect.assertions(1);

        await gameService.play();

        expect(biddingService.playBidding)
          .toHaveBeenNthCalledWith(1, randomPlayer);
      });

      test('1st raid is called with 1st bid returned values', async () => {
        expect.assertions(1);

        await gameService.play();

        expect(raidService.getResult)
          .toHaveBeenNthCalledWith(
            1, firstRaider, firstHeroStub, firstMonsterPileStub
          );
      });

      test('2nd bid is called with raider returned by 1st bid', async () => {
        expect.assertions(1);
        
        await gameService.play();

        expect(biddingService.playBidding)
          .toHaveBeenNthCalledWith(2, firstRaider);
      });

      test('2nd raid is called with 2nd bid returned values', async () => {
        expect.assertions(1);
        
        await gameService.play();

        expect(raidService.getResult)
          .toHaveBeenNthCalledWith(
            2, secondRaider, secondHeroStub, secondMonsterPileStub
          );
      });

      test('3rd raid is called with raider returned by 2nd bid', async () => {
        expect.assertions(1);
        
        await gameService.play();

        expect(biddingService.playBidding)
          .toHaveBeenNthCalledWith(3, secondRaider);
      });

      test('3rd raid is called with 3rd bird returned values', async () => {
        expect.assertions(1);

        await gameService.play();

        expect(raidService.getResult)
          .toHaveBeenNthCalledWith(
            3, thirdRaider, thirdHeroStub, thirdMonsterPileStub
          );
      });
    });

    describe('raidService output consequences', () => {
      let randomPlayer: Player;
      let raider: Player;

      beforeEach(() => {
        randomPlayer = new Player('random');
        raider = new Player('raider');

        // loop condition setup: runs once
        (playersService.isThereAWinner as jest.Mock<boolean, []>)
          .mockReturnValueOnce(false)
          .mockReturnValueOnce(true);

        // random player mock
        (playersService.getRandomPlayer as jest.Mock<Player, []>)
          .mockReturnValue(randomPlayer);
      
        // bidding service mock
        (biddingService.playBidding as jest.Mock<Promise<BiddingResult>, [Player]>)
          .mockResolvedValue({
            raider: raider, hero: heroStub, enemies: monsterPileStub
          });
      });

      test('it calls surviveDungeon for succesful raider', async () => {
        (raidService.getResult as jest.Mock<Promise<RaidResult>, [Player]>)
          .mockResolvedValue({ raider, survived: true });
        expect.assertions(2);
        expect(raider.surviveDungeon).not.toHaveBeenCalled();

        await gameService.play();

        expect(raider.surviveDungeon).toHaveBeenCalledTimes(1);
      });

      test('it calls not dieInDungeon for succesful raider', async () => {
        (raidService.getResult as jest.Mock<Promise<RaidResult>, [Player]>)
          .mockResolvedValue({ raider, survived: true });
        expect.assertions(1);

        await gameService.play();

        expect(raider.dieInDungeon).not.toHaveBeenCalled();
      });

      test('it calls dieInDungeon for unsuccesful raider', async () => {
        (raidService.getResult as jest.Mock<Promise<RaidResult>, [Player]>)
          .mockResolvedValue({ raider, survived: false });
        expect.assertions(2);
        expect(raider.dieInDungeon).not.toHaveBeenCalled();

        await gameService.play();

        expect(raider.dieInDungeon).toHaveBeenCalledTimes(1);
      });

      test('it calls not surviveInDungeon for unsuccesful raider', async () => {
        (raidService.getResult as jest.Mock<Promise<RaidResult>, [Player]>)
          .mockResolvedValue({ raider, survived: false });
        expect.assertions(1);

        await gameService.play();

        expect(raider.surviveDungeon).not.toHaveBeenCalled();
      });
    });

    describe('end of game handling', () => {
      // tslint:disable-next-line: no-shadowed-variable
      const { Player } = jest.requireActual('../../models/player/player.ts');
      let winner: Player;

      beforeEach(() => {
        winner = new Player('winner');

        // loop condition setup: never runs
        (playersService.isThereAWinner as jest.Mock<boolean, []>)
          .mockReturnValueOnce(true);
        
        // getWinner mock
        (playersService.getWinner as jest.Mock<Player, []>)
          .mockReturnValue(winner);
      });

      test('bidding phase is not started', async () => {
        expect.assertions(1);

        await gameService.play();

        expect(biddingService.playBidding).not.toHaveBeenCalled();
      });

      test('uiController is notified with playersService winner', async () => {
        expect.assertions(1);

        await gameService.play();

        expect(uiController.sendPublicNotification)
          .toHaveBeenCalledWith({
            content: expect.toEqualCaseInsensitive(winner.name + ' has won.')
          });
      });
    });
  });  
});

// it should have method for state clearing if players decide to keep on playing