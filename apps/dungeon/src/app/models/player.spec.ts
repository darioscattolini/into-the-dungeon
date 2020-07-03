import { Player } from './player';

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

  describe('beKilledInDungeon', () => {
    it('should increase defeats by one', () => {
      player.beKilledInDungeon();
      const afterOneDefeat = player.defeats;
      player.beKilledInDungeon();
      const afterTwoDefeats = player.defeats;
      expect(afterOneDefeat).toStrictEqual(1);
      expect(afterTwoDefeats).toStrictEqual(2);
    });
  });

  //describe('buildRanking', () => {
    /*
      1 victory = 1 point
      1 defeat = -1 point
      Possible scores: 2 (only one player), 1, 0, -1, -2 (only one player)
    */
  //});
});
