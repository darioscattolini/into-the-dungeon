import { TestBed } from '@angular/core/testing';

import { PlayersService } from './players.service';
import { Player } from '../../models/models';

function addPlayers(service: PlayersService, playersNames: string[]) {
  for(const name of playersNames) {
    service.addPlayer(name);
  }
}

describe('PlayersService', () => {
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
      addPlayers(service, ['John', 'Anna']);
      expect(service.getAmountOfPlayers()).toStrictEqual(2);
    });
  });

  describe('addPlayer', () => {
    it('should add something to the list"', () => {
      const emptyList = service.getPlayersList();
      expect(emptyList).toHaveLength(0);

      service.addPlayer('John');
      const listWithJohn = service.getPlayersList();
      expect(listWithJohn).toHaveLength(1);
    });

    it('should add an instance of Player to the list"', () => {
      service.addPlayer('John');
      const listWithJohn = service.getPlayersList();
      expect(listWithJohn[0]).toBeInstanceOf(Player);
    });

    it('should add a player named John to the list"', () => {
      service.addPlayer('John');
      const listWithJohn = service.getPlayersList();
      expect(listWithJohn[0].name).toBe('John');
    });

    it('should return an instance of Player', () => {
      const returnedPlayer = service.addPlayer('John');
      expect(returnedPlayer).toBeInstanceOf(Player);
    });

    it('should return a player named John', () => {
      const returnedPlayer = service.addPlayer('John');
      expect(returnedPlayer.name).toStrictEqual('John');
    });

    it('should allow to add up to 4 players', () => {
      const john = service.addPlayer('John');
      const anna = service.addPlayer('Anna');
      const chris = service.addPlayer('Chris');
      const teffy = service.addPlayer('Teffy');
      expect(service.getPlayersList()).toEqual([john, anna, chris, teffy]);
    });

    it('should add no more than 4 players', () => {
      for (let i = 0; i < 4; i++) {
        service.addPlayer(String(i));
      }

      expect(service.getAmountOfPlayers()).toStrictEqual(4);

      expect(() => { service.addPlayer('fifth'); })
        .toThrowError('There can only be four players in this game');
    });

    it('should not allow players with the same name', () => {
      service.addPlayer('John');
      expect(() => { service.addPlayer('John'); })
        .toThrowError('There can only be one player named John');
    });

    it('should order players in round using player.nextPlayer field', () => {
      const first = service.addPlayer('first');
      const second = service.addPlayer('second');
      expect(first.nextPlayer).toBe(second);
      expect(second.nextPlayer).toBe(first);

      const third = service.addPlayer('third');
      expect(second.nextPlayer).toBe(third);
      expect(third.nextPlayer).toBe(first);

      const fourth = service.addPlayer('fourth');
      expect(third.nextPlayer).toBe(fourth);
      expect(fourth.nextPlayer).toBe(first);
    });
  });

  describe('getPlayersList', () => {
    it('should return a list of added players', () => {
      const john = service.addPlayer('John');
      const anna = service.addPlayer('Anna');
      expect(service.getPlayersList()).toEqual([john, anna]);
    });

    it('should return a copy of its private list of players', () => {
      const john = service.addPlayer('John');
      const returnedList = service.getPlayersList();
      const anna = service.addPlayer('Anna');
      
      expect(returnedList).toEqual([john]);
      expect(service.getPlayersList()).toEqual([john, anna]);
    });
  });

  describe('getRandomPlayer', () => {
    it('should throw error if called with no players', () => {
      expect(() => service.getRandomPlayer())
        .toThrowError('There are no players');
    });

    it('should return an instance of Player', () => {
      addPlayers(service, ['John', 'Anna', 'Chris', 'Julia']);
      const randomPlayer = service.getRandomPlayer();
      expect(randomPlayer instanceof Player).toBe(true);
    });

    it('should only return players from its list', () => {
      addPlayers(service, ['John', 'Anna', 'Chris', 'Julia']);
      let unexpected = 0;
      for (let i = 0; i < 100; i++) {
        const randomPlayer = service.getRandomPlayer();
        switch(randomPlayer.name) {
          case 'John':
          case 'Anna':
          case 'Chris':
          case 'Julia':
            break;
          default:
            unexpected++;
        }
        expect(unexpected).toBe(0);
      }
    });

    it('should return all players given enough calls', () => {
      addPlayers(service, ['John', 'Anna', 'Chris', 'Julia']);
      const count = {
        John: 0,
        Anna: 0,
        Chris: 0,
        Julia: 0
      }
      while(
        count.John === 0 ||
        count.Anna === 0 ||
        count.Chris === 0 ||
        count.Julia === 0
      ) {
        const randomPlayer = service.getRandomPlayer();
        const name = randomPlayer.name as 'John' | 'Anna' | 'Chris' | 'Julia';
        count[name]++;
      }
      const allHaveBeenReturned = true;
      expect(allHaveBeenReturned).toBe(true);
    });

    // It would be great to test that players are returned randomly,
    // following no pattern.
  });
});
