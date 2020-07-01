import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';
import { GameService } from './game.service';
import { PlayersService } from './players.service';
import { Player } from '../../models/player';

jest.mock('./players.service');
const mockedPlayersService = mocked(PlayersService, true);

const players = [
  new Player('John'),
  new Player('Anna'),
  new Player('Julia')
];

describe('GameService', () => {
  let gameService: GameService;
  let playersService: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [GameService, PlayersService]});
    gameService = TestBed.inject(GameService);
    playersService = mockedPlayersService.mock.instances[0];
    (playersService.getPlayersList as jest.Mock).mockReturnValue(players);
  });

  afterEach(() => {
    mockedPlayersService.mockClear();
    (playersService.getPlayersList as jest.Mock).mockClear();
  });
  
  describe('constructor', () => {
    it('should create service', () => {
      expect(gameService).toBeTruthy();
    });
  
    it('should call PlayersManager constructor', () => {
      expect(PlayersService).toHaveBeenCalledTimes(1);
    });

    it('should instantiate PlayersManager', () => {
      expect(playersService).toBeTruthy();
    });
  });

  describe('start', () => {    
    function onePlayerSetup(playersService: PlayersService): void {
      (playersService.getPlayersList as jest.Mock).mockClear();
      (playersService.getPlayersList as jest.Mock).mockReturnValue([new Player('John')]);
    }

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
      expect(() => { gameService.start() })
        .toThrow(new Error('There must be at least two players to start the game'));
    });

    it('should not call manage method if there are less than 2 players', () => {
      onePlayerSetup(playersService);
      const manageSpy = jest.spyOn(gameService, 'manage');
      try { gameService.start(); }
      catch { }
      finally { expect(manageSpy).toHaveBeenCalledTimes(0); }
    });

    it('should call manage method if everything is ok', () => {
      const manageSpy = jest.spyOn(gameService, 'manage');
      gameService.start();
      expect(manageSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('manage', () => {
    const goesOnSpy = jest.spyOn(gameService, 'goesOn');
    
      // one player wins or loses two dungeons in a row
    function quickWinOrLoseSetup() {
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(false);
    }

      // there are more than two rounds before a player wins or loses two dungeons
    function longerGameSetup() {
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(true);
      goesOnSpy.mockReturnValueOnce(false);
    }
  
    it('should check if game goes on at least three times', () => {
      quickWinOrLoseSetup();
      gameService.manage();
      expect(goesOnSpy).toHaveBeenCalledTimes(3);
    });

    it('should check if game goes on once per round + 1', () => {
      longerGameSetup();
      gameService.manage();
      expect(goesOnSpy).toHaveBeenCalledTimes(5);
    });
  });
});