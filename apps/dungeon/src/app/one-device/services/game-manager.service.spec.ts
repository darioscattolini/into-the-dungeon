import { TestBed } from '@angular/core/testing';

import { GameManagerService } from './game-manager.service';

describe('GameManagerService', () => {
  let service: GameManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [GameManagerService] });
    service = TestBed.inject(GameManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAmountOfPlayers', () => {
    it('should return 0 when service is created', () => {
      expect(service.getAmountOfPlayers()).toStrictEqual(0);
    });
  });

  describe('addPlayer', () => {
    it('should add player named "John"', () => {
      service.addPlayer('John');
      const lastPlayer = service.getAmountOfPlayers.length - 1;
      expect(service.getPlayer(lastPlayer).name).toBe('John');
    });
  })
});

// addPlayer should add no more than 4 players
// addPlayer should not add repeated or empty names
// there should be at least 2 players before game starts