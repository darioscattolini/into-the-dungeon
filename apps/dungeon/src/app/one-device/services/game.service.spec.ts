import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';
import { GameService } from './game.service';
import { PlayersService } from './players.service';
import { BiddingService} from './bidding.service';
import { Player } from '../../models/player';

jest.mock('./players.service');
const mockedPlayersService = mocked(PlayersService, true);

jest.mock('./bidding.service.ts');
const mockedBiddingService = mocked(BiddingService, true);

describe('GameService', () => {
  let players: Player[];
  let gameService: GameService;
  let playersService: PlayersService;
  let biddingService: BiddingService;

  beforeEach(() => {
    players = [
      new Player('John'),
      new Player('Anna'),
      new Player('Julia')
    ];
    TestBed.configureTestingModule({ providers: [GameService, PlayersService, BiddingService]});
    gameService = TestBed.inject(GameService);
    playersService = mockedPlayersService.mock.instances[0];
    (playersService.getPlayersList as jest.Mock).mockReturnValue(players);
    biddingService = mockedBiddingService.mock.instances[0];
  });

  afterEach(() => {
    mockedPlayersService.mockClear();
    (playersService.getPlayersList as jest.Mock).mockClear();
  });
  
  describe('constructor', () => {
    it('should create service', () => {
      expect(gameService).toBeTruthy();
    });
  
    it('should call PlayersService constructor', () => {
      expect(PlayersService).toHaveBeenCalledTimes(1);
    });

    it('should instantiate PlayersService', () => {
      expect(playersService).toBeTruthy();
    });

    /*it('should call BiddingService constructor', () => {
      expect(BiddingService).toHaveBeenCalledTimes(1);
    });

    it('should instantiate BiddingService', () => {
      expect(biddingService).toBeTruthy();
    });*/
  });

  describe('start', () => {    
    // tslint:disable-next-line: no-shadowed-variable
    function onePlayerSetup(playersService: PlayersService): void {
      (playersService.getPlayersList as jest.Mock).mockClear();
      (playersService.getPlayersList as jest.Mock).mockReturnValue([new Player('John')]);
    }

    let manageSpy: jest.SpyInstance<void, []>;
    beforeEach(() => {
      manageSpy = jest.spyOn(gameService, 'manage')
        .mockImplementation(() => {});
    });

    it('should call playersManager.getPlayersList', () => {
      gameService.start();
      expect(playersService.getPlayersList).toHaveBeenCalledTimes(1);
    });

    it('should store returned players array in players field', () => {
      gameService.start();
      expect(gameService.players).toStrictEqual(players);
    });

    it('should throw error if there are less than 2 players', () => {
      onePlayerSetup(playersService);
      expect(() => { gameService.start(); })
        .toThrow(new Error('There must be at least two players to start the game'));
    });

    it('should not call manage method if there are less than 2 players', () => {
      onePlayerSetup(playersService);
      try { gameService.start(); }
      catch { }
      finally { expect(manageSpy).toHaveBeenCalledTimes(0); }
    });

    it('should call manage method if everything is ok', () => {
      gameService.start();
      expect(manageSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('manage', () => {
    let goesOnSpy: jest.SpyInstance<boolean, []>;
     
      // one player wins or loses two dungeons in a row
    // tslint:disable-next-line: no-shadowed-variable
    function quickWinOrLoseSetup(goesOnSpy: jest.SpyInstance<boolean, []>) {
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(false);
    }

      // there are more than two rounds before a player wins or loses two dungeons
    // tslint:disable-next-line: no-shadowed-variable
    function longerGameSetup(goesOnSpy: jest.SpyInstance<boolean, []>) {
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(false);
    }
    
    beforeEach(() => {
      goesOnSpy = jest.spyOn(gameService, 'goesOn');
    });

    it('should check if game goes on at least three times', () => {
      quickWinOrLoseSetup(goesOnSpy);
      gameService.manage();
      expect(goesOnSpy).toHaveBeenCalledTimes(3);
    });

    it('should check if game goes on once per round + 1', () => {
      longerGameSetup(goesOnSpy);
      gameService.manage();
      expect(goesOnSpy).toHaveBeenCalledTimes(5);
    });
  });

  describe('goesOn', () => {
    beforeEach(() => {
      gameService.players = players;
    });

    it ('should return true with 0 victories and defeats', () => {
      expect(gameService.goesOn()).toStrictEqual(true);
    });

    it ('should return true with some players with 1 victory', () => {
      players[0].surviveDungeon();
      players[2].surviveDungeon();
      expect(gameService.goesOn()).toStrictEqual(true);
    });

    it ('should return true with some players with 1 defeat', () => {
      players[0].beKilledInDungeon();
      players[2].beKilledInDungeon();
      expect(gameService.goesOn()).toStrictEqual(true);
    });

    it ('should return true with mixes of 1 defeat/1 victory', () => {
      players[0].beKilledInDungeon();
      players[1].surviveDungeon();
      players[2].beKilledInDungeon();
      players[2].surviveDungeon();
      expect(gameService.goesOn()).toStrictEqual(true);
    });

    it('should return false when 1 player gets 2 victories', () => {
      players[0].beKilledInDungeon();
      players[1].surviveDungeon();
      players[2].beKilledInDungeon();
      players[2].surviveDungeon();
      players[2].surviveDungeon();
      expect(gameService.goesOn()).toStrictEqual(false);
    });

    it('should return false when 1 player gets 2 defeats', () => {
      players[0].beKilledInDungeon();
      players[1].surviveDungeon();
      players[2].beKilledInDungeon();
      players[2].surviveDungeon();
      players[2].beKilledInDungeon();
      expect(gameService.goesOn()).toStrictEqual(false);
    });
  });
});
