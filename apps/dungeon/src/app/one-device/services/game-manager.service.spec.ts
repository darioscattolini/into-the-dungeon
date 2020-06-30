import { GameManagerService } from './game-manager.service';
import { Player } from '../../models/player';

describe('GameManagerService', () => {
  let gameManager: GameManagerService;
  const players = [
    new Player('John'),
    new Player('Anna'),
    new Player('Julia')
  ];
  const playersManagerMock = { getPlayersList: jest.fn(() => players) };

  beforeEach(() => {
    gameManager = new GameManagerService(playersManagerMock);
  });

  it('should be created', () => {
    expect(gameManager).toBeTruthy();
  });

  describe('start', () => {
    it('should get list of players from PlayersManagerService', () => {
      gameManager.start();
      expect(gameManager.players).toContainEqual(players);
    });
  });
});

// there should be at least 2 players before game starts