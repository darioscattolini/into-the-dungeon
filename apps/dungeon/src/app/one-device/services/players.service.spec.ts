import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';
import { Player } from '../../models/player';

describe('PlayersManagerService', () => {
  let service: PlayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [PlayersService] });
    service = TestBed.inject(PlayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAmountOfPlayers', () => {
    it('should return 0 when service is created', () => {
      expect(service.getAmountOfPlayers()).toStrictEqual(0);
    });

    it('should return 2 after 2 players are added', () => {
      service.addPlayer('John');
      service.addPlayer('Anna');
      expect(service.getAmountOfPlayers()).toStrictEqual(2);
    });
  });

  describe('addPlayer', () => {
    it('should add player named "John"', () => {
      service.addPlayer('John');
      const lastPlayerIndex = service.getAmountOfPlayers() - 1;
      const lastPlayer = service.getPlayer(lastPlayerIndex);
      expect(lastPlayer.name).toBe('John');
      expect(lastPlayer).toBeInstanceOf(Player);
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

    it('should return a Player named John', () => {
      const returned = service.addPlayer('John');
      expect(returned.name).toStrictEqual('John');
      expect(returned).toBeInstanceOf(Player);
    });
  });

  describe('getPlayersList', () => {
    it('should return a list of added players', () => {
      service.addPlayer('John');
      service.addPlayer('Anna');

      expect(service.getPlayersList().length).toStrictEqual(2);
      expect(service.getPlayersList().map(player => player.name))
        .toContain('John');
      expect(service.getPlayersList().map(player => player.name))
        .toContain('Anna');
    });

    it('should return a copy of its private list of players', () => {
      service.addPlayer('John');
      const returnedList = service.getPlayersList();
      service.addPlayer('Anna');
      
      expect(returnedList.length).toStrictEqual(1);
      expect(service.getPlayersList().length).toStrictEqual(2);
    });
  });
});
