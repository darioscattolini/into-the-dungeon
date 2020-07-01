import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';
import { GameService } from './game.service';
import { PlayersService } from './players.service';
import { Player } from '../../models/player';

jest.mock('./players.service');
const mockedPlayersService = mocked(PlayersService, true);

describe('GameService', () => {
  let gameService: GameService;
  let playersService: PlayersService;
  const players = [
    new Player('John'),
    new Player('Anna'),
    new Player('Julia')
  ];

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
    it('should call playersManager.getPlayersList', () => {
      gameService.start();
      expect(playersService.getPlayersList).toHaveBeenCalledTimes(1);
    });

    it('should store returned players array in players field', () => {
      gameService.start();
      expect(gameService.players).toStrictEqual(players);
    });

    it('should throw error if there are less than 2 players', () => {
      (playersService.getPlayersList as jest.Mock).mockClear();
      (playersService.getPlayersList as jest.Mock).mockReturnValue([new Player('John')]);
      expect(() => { gameService.start() })
        .toThrow(new Error('There must be at least two players to start the game'));
    });
  });
});