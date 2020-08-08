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

  test('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAmountOfPlayers', () => {
    test('it returns 0 just after service is created', () => {
      expect(service.getAmountOfPlayers()).toBe(0);
    });

    test('it returns 2 after 2 players are added', () => {
      addPlayers(service, ['John', 'Anna']);
      expect(service.getAmountOfPlayers()).toBe(2);
    });
  });

  describe('addPlayer', () => {
    let listBefore: Player[];

    beforeEach(() => {
      listBefore = service.getPlayersList();
    });

    test('it adds something to players list"', () => {
      expect(listBefore).toHaveLength(0);

      service.addPlayer('John');
      const listAfter = service.getPlayersList();

      expect(listAfter).toHaveLength(1);
    });

    test('it adds an instance of Player to the list"', () => {
      service.addPlayer('John');
      const listAfter = service.getPlayersList();

      expect(listAfter[0]).toBeInstanceOf(Player);
    });

    test('it adds a player named after parameter to the list"', () => {
      service.addPlayer('John');
      const listWithJohn = service.getPlayersList();

      expect(listWithJohn[0].name).toBe('John');
    });

    test('it returns added Player', () => {
      const returnedPlayer = service.addPlayer('John');
      const addedPlayer = service.getPlayersList()[0];

      expect(returnedPlayer).toBe(addedPlayer);
    });

    test('it allows to add up to 4 players', () => {
      const john = service.addPlayer('John');
      const anna = service.addPlayer('Anna');
      const chris = service.addPlayer('Chris');
      const teffy = service.addPlayer('Teffy');

      expect(service.getPlayersList())
        .toIncludeSameMembers([john, anna, chris, teffy]);
    });

    test('it does not allow to add more than 4 players', () => {
      for (let i = 0; i < 4; i++) {
        service.addPlayer(String(i));
      }

      expect(service.getAmountOfPlayers()).toBe(4);

      expect(() => { service.addPlayer('fifth'); })
        .toThrowError('There can only be four players in this game');
    });

    test('it does not allow players with the same name', () => {
      service.addPlayer('John');
      expect(() => { service.addPlayer('John'); })
        .toThrowError('There can only be one player named John');
    });

    test('it orders players in round using player.nextPlayer field', () => {
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
    test('it returns a list of added players', () => {
      const john = service.addPlayer('John');
      const anna = service.addPlayer('Anna');
      expect(service.getPlayersList())
        .toIncludeSameMembers([john, anna]);
    });

    test('should return a copy of its private list of players', () => {
      const john = service.addPlayer('John');
      const returnedList = service.getPlayersList();
      const anna = service.addPlayer('Anna');
      
      expect(returnedList).toIncludeSameMembers([john]);
      expect(service.getPlayersList()).toIncludeSameMembers([john, anna]);
    });
  });

  describe('getRandomPlayer', () => {
    test('it throws error if no players were added', () => {
      expect(() => service.getRandomPlayer())
        .toThrowError('There are no players');
    });

    test('it returns a player from its list', () => {
      addPlayers(service, ['John', 'Anna', 'Chris', 'Julia']);
      const [ added1, added2, added3, added4 ] = service.getPlayersList();

      let unexpected = 0;
      for (let i = 0; i < 100; i++) {
        const randomPlayer = service.getRandomPlayer();
        switch(randomPlayer) {
          case added1:
          case added2:
          case added3:
          case added4:
            break;
          default:
            unexpected++;
        }

        expect(unexpected).toBe(0);
      }
    });

    test('it returns all players from its list given enough calls', () => {
      addPlayers(service, ['John', 'Anna', 'Chris', 'Julia']);

      const count = {
        John: 0,
        Anna: 0,
        Chris: 0,
        Julia: 0,
        ready() {
          return this.John > 0 && this.Anna > 0 && this.Chris > 0 &&
                 this.Julia > 0;
        }
      }
      while(!count.ready()) {
        const randomPlayer = service.getRandomPlayer();
        const name = randomPlayer.name as 'John' | 'Anna' | 'Chris' | 'Julia';
        count[name]++;
      }
      
      expect(count.ready()).toBeTrue();
    });

    // It would be great to test that players are returned randomly,
    // following no pattern.
  });

  describe('isThereAWinner', () => {
    let john: Player,
        anna: Player,
        chris: Player,
        teffy: Player;

    beforeEach(() => {
      addPlayers(service, ['John', 'Anna', 'Chris', 'Teffy']);
      [john, anna, chris, teffy] = service.getPlayersList();
    });

    test('it returns false with 0 victories and defeats', () => {
      expect(service.isThereAWinner()).toBeFalse();
    });

    test('it returns false with some players with 1 victory', () => {
      john.surviveDungeon();
      chris.surviveDungeon();
      expect(service.isThereAWinner()).toBeFalse();
    });

    test('it returns false with some players with 1 defeat', () => {
      john.dieInDungeon();
      chris.dieInDungeon();
      expect(service.isThereAWinner()).toBeFalse();
    });

    test('it returns false with mixes of 1 defeat/1 victory', () => {
      john.dieInDungeon();
      anna.surviveDungeon();
      chris.dieInDungeon();
      chris.surviveDungeon();
      expect(service.isThereAWinner()).toBeFalse();
    });

    test('it returns true when 1 player gets 2 victories', () => {
      john.dieInDungeon();
      anna.surviveDungeon();
      chris.dieInDungeon();
      chris.surviveDungeon();
      chris.surviveDungeon();
      expect(service.isThereAWinner()).toBeTrue();
    });

    test('it returns true when all but 1 player are out of the game', () => {
      john.dieInDungeon();
      chris.surviveDungeon();
      anna.dieInDungeon();
      anna.surviveDungeon();
      anna.dieInDungeon();
      teffy.dieInDungeon();
      chris.dieInDungeon();
      john.dieInDungeon();
      expect(service.isThereAWinner()).toBeFalse();
      teffy.dieInDungeon();
      expect(service.isThereAWinner()).toBeTrue();
    });
  });

  describe('getWinner', () => {
    let john: Player,
        anna: Player;
    
    beforeEach(() => {
      john = service.addPlayer('John');
      anna = service.addPlayer('Anna');
    });

    test('it throws error if there are no winners', () => {
      expect(service.isThereAWinner()).toBeFalse();
      expect(() => { service.getWinner() })
        .toThrowError('There is no winner yet');
    });

    test('it returns a 2-victory winning player', () => {
      anna.surviveDungeon();
      anna.surviveDungeon();
      expect(service.getWinner()).toBe(anna);
    });

    test('it returns a last-standing winning player', () => {
      anna.dieInDungeon();
      anna.dieInDungeon();
      expect(service.getWinner()).toBe(john);
    });
  });
});
