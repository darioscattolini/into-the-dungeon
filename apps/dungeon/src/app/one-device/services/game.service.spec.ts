import { TestBed } from '@angular/core/testing';
import { mocked } from 'ts-jest/utils';
import { GameService } from './game.service';
import { PlayersService } from './players.service';
import { Player } from '../../models/player';

jest.mock('./players.service');
const mockedPlayersManager = mocked(PlayersService, true);

describe('GameManagerService', () => {
  let gameManager: GameService;
  let playersManager: PlayersService;
  const players = [
    new Player('John'),
    new Player('Anna'),
    new Player('Julia')
  ];

  beforeEach(() => {
    mockedPlayersManager.mockClear();
    TestBed.configureTestingModule({ providers: [GameService, PlayersService]});
    gameManager = TestBed.inject(GameService);
    playersManager = mockedPlayersManager.mock.instances[0];
    (playersManager.getPlayersList as jest.Mock).mockReturnValue(players);
  });
  
  describe('constructor', () => {
    it('should create service', () => {
      expect(gameManager).toBeTruthy();
    });
  
    it('should call PlayersManager constructor', () => {
      expect(PlayersService).toHaveBeenCalledTimes(1);
    });

    it('should instantiate PlayersManager', () => {
      expect(playersManager).toBeTruthy();
    });
  });

  describe('start', () => {
    it('should call playersManager.getPlayersList', () => {
      gameManager.start();
      expect(playersManager.getPlayersList).toHaveBeenCalledTimes(1);
    });

    it('should store returned players array in players field', () => {
      gameManager.start();
      expect(gameManager.players).toStrictEqual(players);
    });
  });
});

// there should be at least 2 players before game starts