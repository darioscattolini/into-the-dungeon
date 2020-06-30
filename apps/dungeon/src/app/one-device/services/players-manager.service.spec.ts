import { TestBed } from '@angular/core/testing';

import { PlayersManagerService } from './players-manager.service';

describe('PlayersManagerService', () => {
  let service: PlayersManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayersManagerService);
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
      const lastPlayer = service.getAmountOfPlayers() - 1;
      expect(service.getPlayer(lastPlayer).name).toBe('John');
    });

    it('should add no more than 4 players', () => {
      for (let i = 0; i < 4; i++) {
        service.addPlayer(String(i));
      }

      expect(service.getAmountOfPlayers()).toStrictEqual(4);

      expect(() => { service.addPlayer('fifth'); })
        .toThrow(new Error('There can only be four players in this game'));
    });

    it('should not allow players with the same name', () => {
      service.addPlayer('John');
      expect(() => { service.addPlayer('John'); })
        .toThrow(new Error('There can only be one player named John'));
    });
  });
});
