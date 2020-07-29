import { Player } from './player';

declare global {
  namespace jest {
    interface Matchers<R> {
      toDeepEqual(matchingArray: Player[][]): R
    }
  }
}

expect.extend({
  toDeepEqual(receivedArray: Player[][], matchingArray: Player[][]) {
    let pass = true;
    if (receivedArray.length !== matchingArray.length) {
      pass = false;
    } else {
      for (let i = 0; i < receivedArray.length; i++) {
        if (receivedArray[i].length !== matchingArray[i].length) {
          pass = false;
          break;
        } else {
          for (let j = 0; j < receivedArray[i].length; j++) {
            if (receivedArray[i][j] !== matchingArray[i][j]) {
              pass = false;
              break;
            }
          }
        }
      }
    }

    if (pass) {
      return {
        message: () =>
          `expected ${receivedArray} not to be deep equal to ${matchingArray}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${receivedArray} to be deep equal to ${matchingArray}`,
        pass: false,
      };
    }
  }
});

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player('John');
  });

  describe('constructor', () => {
    it('should create instance', () => {
      expect(player).toBeTruthy();
    });
  
    it('should create instance named "John" for that constructor parameter', () => {
      expect(player.name).toBe('John');
    });
  
    it('should not create a player with empty name', () => {
      expect(() => { const unnamedPlayer = new Player(''); })
        .toThrow(new Error('Player\'s names should have at least one character'));
    });
    
    it('should create a player with 0 victories', () => {
      expect(player.victories).toStrictEqual(0);
    });
  
    it('should create a player with 0 defeats', () => {
      expect(player.defeats).toStrictEqual(0);
    });

    it('should create a player with undefined nextPlayer', () => {
      expect(player.nextPlayer).toBeUndefined();
    });
  });

  describe('surviveDungeon', () => {
    it('should increase victories by one', () => {
      player.surviveDungeon();
      const afterOneVictory = player.victories;
      player.surviveDungeon();
      const afterTwoVictories = player.victories;
      expect(afterOneVictory).toStrictEqual(1);
      expect(afterTwoVictories).toStrictEqual(2);
    });

    it('should not allow a third victory', () => {
      player.surviveDungeon();
      player.surviveDungeon();
      expect(() => { player.surviveDungeon(); })
        .toThrow(new Error('The game must end after a player reaches 2 victories'));
    });
  });

  describe('dieInDungeon', () => {
    it('should increase defeats by one', () => {
      player.dieInDungeon();
      const afterOneDefeat = player.defeats;
      player.dieInDungeon();
      const afterTwoDefeats = player.defeats;
      expect(afterOneDefeat).toStrictEqual(1);
      expect(afterTwoDefeats).toStrictEqual(2);
    });

    it('should not allow a third defeat', () => {
      player.dieInDungeon();
      player.dieInDungeon();
      expect(() => { player.dieInDungeon(); })
        .toThrow(new Error('The game must end after a player reaches 2 defeats'));
    });
  });

  describe('buildRanking', () => {
    /*
      1 victory = 1 point
      1 defeat = -1 point
      Possible scores: 2 (only one player), 1, 0, -1, -2 (only one player)
      Ranking is an array where 0 is top score
    */
    it('should build rankings following the above rules', () => {
      const players = [
        new Player('John'),
        new Player('Anna'),
        new Player('Mark'),
        new Player('Julia')
      ];
      const [ john, anna, mark, julia ] = players;

      expect(Player.buildRanking(players)).toDeepEqual(
        [
          [anna, john, julia, mark]
        ]
      );

      john.surviveDungeon();
      expect(Player.buildRanking(players)).toDeepEqual(
        [
          [john],
          [anna, julia, mark]
        ]
      );

      john.dieInDungeon();
      expect(Player.buildRanking(players)).toDeepEqual(
        [
          [anna, john, julia, mark]
        ]
      );

      anna.surviveDungeon();
      expect(Player.buildRanking(players)).toDeepEqual(
        [
          [anna],
          [john, julia, mark]
        ]
      );

      julia.dieInDungeon();
      expect(Player.buildRanking(players)).toDeepEqual(
        [
          [anna],
          [john, mark],
          [julia]
        ]
      );

      mark.surviveDungeon();
      expect(Player.buildRanking(players)).toDeepEqual(
        [
          [anna, mark],
          [john],
          [julia]
        ]
      );

      mark.surviveDungeon();
      expect(Player.buildRanking(players)).toDeepEqual(
        [
          [mark],
          [anna],
          [john],
          [julia]
        ]
      );
    });
  });
});
