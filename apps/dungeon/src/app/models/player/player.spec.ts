import { Player } from './player';

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player('John');
  });

  describe('constructor', () => {
    test('instance is created', () => {
      expect(player).toBeTruthy();
    });
  
    test('it is named after constructor parameter', () => {
      expect(player.name).toBe('John');
    });
  
    test('it cannot be created with empty name', () => {
      expect(() => { const unnamedPlayer = new Player(''); })
        .toThrowError('Player\'s names should have at least one character');
    });
    
    test('it is created with 0 victories', () => {
      expect(player.victories).toBe(0);
    });
  
    test('it is created with 0 defeats', () => {
      expect(player.defeats).toBe(0);
    });

    test('it is created with undefined nextPlayer', () => {
      expect(player.nextPlayer).toBeUndefined();
    });

    test('it is created with active field set to true', () => {
      expect(player.active).toBe(true);
    });
  });

  describe('surviveDungeon', () => {
    test('it increases victories by one', () => {
      for (let i = 0; i < 2; i++) {
        const startingVictories = player.victories;
        player.surviveDungeon();
        expect(player.victories).toBe(startingVictories + 1);
      }
    });

    test('it cannot be called three times', () => {
      player.surviveDungeon();
      player.surviveDungeon();
      expect(() => { player.surviveDungeon(); })
        .toThrowError('The game must end after a player reaches 2 victories');
    });
  });

  describe('dieInDungeon', () => {
    test('it increases defeats by one', () => {
      for (let i = 0; i < 2; i++) {
        const startingDefeats = player.defeats;
        player.dieInDungeon();
        expect(player.defeats).toBe(startingDefeats + 1);
      }
    });

    test('it cannot be called three times', () => {
      player.dieInDungeon();
      player.dieInDungeon();
      expect(() => { player.dieInDungeon(); })
        .toThrowError('The game must end after a player reaches 2 defeats');
    });

    test('active field stays true after 1 defeat', () => {
      expect(player.defeats).toBe(0);
      player.dieInDungeon();
      expect(player.active).toBe(true);
    });

    test('active fields becames false after 2 defeats', () => {
      expect(player.defeats).toBe(0);
      player.dieInDungeon();
      player.dieInDungeon();
      expect(player.active).toBe(false);
    });
  });

  describe('buildRanking', () => {
    /*
      1 victory = 1 point
      1 defeat = -1 point
      Possible scores: 2 (only one player), 1, 0, -1, -2 (only one player)
      Ranking is an array where 0 is top score
    */
    test('ranking is built following the above rules', () => {
      const players = [
        new Player('John'),
        new Player('Anna'),
        new Player('Mark'),
        new Player('Julia')
      ];
      const [ john, anna, mark, julia ] = players;

      expect(Player.buildRanking(players)).toEqual([
        expect.toIncludeSameMembers([anna, john, julia, mark])    
      ]);

      john.surviveDungeon();
      expect(Player.buildRanking(players)).toEqual([
        expect.toIncludeSameMembers([john]),
        expect.toIncludeSameMembers([anna, julia, mark])
      ]);

      john.dieInDungeon();
      expect(Player.buildRanking(players)).toEqual([
        expect.toIncludeSameMembers([anna, john, julia, mark])    
      ]);

      anna.surviveDungeon();
      expect(Player.buildRanking(players)).toEqual([
        expect.toIncludeSameMembers([anna]),
        expect.toIncludeSameMembers([john, julia, mark])
      ]);

      julia.dieInDungeon();
      expect(Player.buildRanking(players)).toEqual([
        expect.toIncludeSameMembers([anna]),
        expect.toIncludeSameMembers([john, mark]),
        expect.toIncludeSameMembers([julia])
      ]);

      mark.surviveDungeon();
      expect(Player.buildRanking(players)).toEqual([
        expect.toIncludeSameMembers([anna, mark]),
        expect.toIncludeSameMembers([john]),
        expect.toIncludeSameMembers([julia])
      ]);

      mark.surviveDungeon();
      expect(Player.buildRanking(players)).toEqual([
        expect.toIncludeSameMembers([mark]),
        expect.toIncludeSameMembers([anna]),
        expect.toIncludeSameMembers([john]),
        expect.toIncludeSameMembers([julia])
      ]);
    });
  });
});
