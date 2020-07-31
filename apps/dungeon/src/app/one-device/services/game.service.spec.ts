import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';
import { GameService } from './game.service';
import { PlayersService } from './players.service';
import { BiddingService } from './bidding.service';
import { RaidService } from './raid.service';
import { 
  Player, IBiddingResult, IRaidResult, Hero, Monster
} from '../../models/models';
import { noEquipHeroStub } from '../../mocks/hero.mocks';

jest.mock('./bidding.service.ts');
const MockedBiddingService = mocked(BiddingService, true);

jest.mock('./raid.service.ts');
const MockedRaidService = mocked(RaidService, true);

jest.mock('./players.service');
const MockedPlayersService = mocked(PlayersService, true);

function mockPlayersService(
  playersService: PlayersService, 
  playersAmount: number,
  randomPlayer?: Player
) {
  MockedPlayersService.mockClear();
  (playersService.getAmountOfPlayers as jest.Mock<number, []>)
    .mockReturnValue(playersAmount);
  if (randomPlayer) {
    (playersService.getRandomPlayer as jest.Mock<Player, []>)
      .mockReturnValue(randomPlayer);
  }
  return {
    playersService,
  };
}

const heroStub: Hero = noEquipHeroStub;
const monsterPileStub: Monster[] = [];
function mockBiddingService(
  biddingService: BiddingService, 
  returnedRaiders: Player[]
): BiddingService {
  MockedBiddingService.mockClear();
  
  for (const raider of returnedRaiders) {
    (biddingService.getResult as jest.Mock<Promise<IBiddingResult>, [Player]>)
      .mockResolvedValueOnce({
        raider: raider,
        hero: heroStub,
        enemies: monsterPileStub
      });
  }
  
  return biddingService;
}

function mockRaidService(
  raidService: RaidService,
  outcomes: boolean[]
): RaidService {
  MockedRaidService.mockClear();  
  
  for (const outcome of outcomes)
  {
    (raidService
      .getResult as jest.Mock<Promise<IRaidResult>, [Player, Hero, Monster[]]>)
      .mockImplementationOnce(
        async (raider: Player, hero: Hero, monsters: Monster[]) => {
          return {
            raider: raider,
            survived: outcome
          }
        }
      );
  }
  
  return raidService;
}

describe('GameService', () => {
  let gameService:    GameService;
  let biddingService: BiddingService;
  let raidService:    RaidService;
  let playersService: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ GameService, PlayersService, BiddingService, RaidService ]
    });
    gameService     = TestBed.inject(GameService);
    biddingService  = TestBed.inject(BiddingService);
    raidService     = TestBed.inject(RaidService);
    playersService  = TestBed.inject(PlayersService);
  });

  afterEach(() => {
    MockedPlayersService.mockClear();
    MockedBiddingService.mockClear();
    MockedRaidService.mockClear();
  });
  
  it('should be created', () => {
    expect(gameService).toBeTruthy();
  });

  describe('play', () => {    
    it('should verify the amount of players once', async () => {
      expect.assertions(1);
      try { await gameService.play(); }
      catch { }
      finally {
        expect(playersService.getAmountOfPlayers).toHaveBeenCalledTimes(1);
      }
    });

    it('should throw error if there are 0 players', async () => {
      mockPlayersService(playersService, 0);
      expect.assertions(1);
      try {
        await gameService.play()
      } catch(error) {
        const message = (error as Error).message;
        expect(message)
          .toBe('There must be at least two players to start the game')
      }
    });

    it('should not call biddingService if there are 0 players', async () => {
      mockPlayersService(playersService, 0);
      expect.assertions(1);
      try { await gameService.play(); }
      catch { }
      finally { 
        expect(biddingService.getResult).toHaveBeenCalledTimes(0);
      }
    });

    it('should throw error if there is only 1 player', async () => {
      mockPlayersService(playersService, 1);
      expect.assertions(1);
      try {
        await gameService.play()
      } catch(error) {
        const message = (error as Error).message;
        expect(message)
          .toBe('There must be at least two players to start the game')
      }
    });

    it('should not call biddingService if there is only 1 player', async () => {
      mockPlayersService(playersService, 1);
      expect.assertions(1);
      try { await gameService.play(); }
      catch { }
      finally { 
        expect(biddingService.getResult).toHaveBeenCalledTimes(0);
      }
    });

    it('should throw error if players > 4', async () => {
      mockPlayersService(playersService, 5);
      expect.assertions(1);
      try {
        await gameService.play()
      } catch(error) {
        const message = (error as Error).message;
        expect(message)
          .toBe('There cannot be more than 5 players')
      }
    });

    it('should not call biddingService if players > 4', async () => {
      mockPlayersService(playersService, 5);
      expect.assertions(1);
      try { await gameService.play(); }
      catch { }
      finally { 
        expect(biddingService.getResult).toHaveBeenCalledTimes(0);
      }
    });

    it('should call playersService.getRandomPlayer once', async () => {
      mockPlayersService(playersService, 4);
      expect.assertions(1);
      try { await gameService.play(); }
      catch { }
      finally {
        expect(playersService.getRandomPlayer).toHaveBeenCalledTimes(1);
      }
    });

    it('should call playersService.isThereAWinner at least once', async () => {
      mockPlayersService(playersService, 4);
      expect.assertions(1);
      try { await gameService.play(); }
      catch { }
      finally {
        expect(playersService.isThereAWinner).toHaveBeenCalledTimes(1);
      }
    });

    it('should call isThereAWinner n+1 times if false n times', async () => {
      const john = new Player('John');
      const anna = new Player('Anna');
      mockBiddingService(biddingService, [john, anna, anna]);
      mockRaidService(raidService, [false, true, true]);

      (playersService.isThereAWinner as jest.Mock<boolean, []>)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(false)
        .mockReturnValueOnce(true);

      await gameService.play();
    
      expect(playersService.isThereAWinner).toHaveBeenCalledTimes(4);
    });

    it('should 1st call biddingService.getResult w/ randomPlayer', async () => {
      const randomPlayer = new Player('John');
      mockPlayersService(playersService, 4, randomPlayer);
      
      try { await gameService.play() } 
      catch { }
      finally {
        expect(biddingService.getResult).toHaveBeenCalledWith(randomPlayer);
      }
    });

    it('should then call biddingService.getResult w/ last rider', async () => {
      const randomPlayer = new Player('John');
      const firstRaider = new Player('Anna');
      const secondRaider = new Player('Chris');
      mockPlayersService(playersService, 4, randomPlayer);
      mockBiddingService(biddingService, [firstRaider, secondRaider]);
      mockRaidService(raidService, [true, true]);
      
      expect.assertions(3);
      try { await gameService.play() }
      catch { }
      finally {
        expect(biddingService.getResult).toHaveBeenNthCalledWith(1, randomPlayer);
        expect(biddingService.getResult).toHaveBeenNthCalledWith(2, firstRaider);
        expect(biddingService.getResult).toHaveBeenNthCalledWith(3, secondRaider);
      }
    });

    it('should call raidService.getResult w/ bidding return', async () => {
      const raider = new Player('John');
      mockBiddingService(biddingService, [raider]);
      
      expect.assertions(1);
      try { await gameService.play() }
      catch { }
      finally {
        expect(raidService.getResult)
          .toHaveBeenCalledWith(raider, heroStub, monsterPileStub);
      }
    });
  
    it('should add one victory to successful raider', async () => {
      const raider = new Player('John');
      mockBiddingService(biddingService, [raider]);
      mockRaidService(raidService, [true]);
      
      expect.assertions(2);
      expect(raider.victories).toBe(0);
      try { await gameService.play() }
      catch { }
      finally {
        expect(raider.victories).toBe(1);
      }
    });
  
    it('should not add a defeat to successful raider', async () => {
      const raider = new Player('John');
      mockBiddingService(biddingService, [raider]);
      mockRaidService(raidService, [true]);
      
      expect.assertions(2);
      expect(raider.defeats).toBe(0);
      try { await gameService.play() }
      catch { }
      finally {
        expect(raider.defeats).toBe(0);
      }
    });
  
    it('should add one defeat to unsuccessful raider', async () => {
      const raider = new Player('John');
      mockBiddingService(biddingService, [raider]);
      mockRaidService(raidService, [false]);
      
      expect.assertions(2);
      expect(raider.defeats).toBe(0);
      try { await gameService.play() }
      catch { }
      finally {
        expect(raider.defeats).toBe(1);
      }
    });
  
    it('should not add a victory to unsuccessful raider', async () => {
      const raider = new Player('John');
      mockBiddingService(biddingService, [raider]);
      mockRaidService(raidService, [false]);
      
      expect.assertions(2);
      expect(raider.victories).toBe(0);
      try { await gameService.play() }
      catch { }
      finally {
        expect(raider.victories).toBe(0);
      }
    });

    it('should not start new bidding phase if someone won', async () => {
      (playersService.isThereAWinner as jest.Mock<boolean, []>)
        .mockReturnValue(true);
      await gameService.play();
      expect(biddingService.getResult).toHaveBeenCalledTimes(0);
    });
  });  
});
