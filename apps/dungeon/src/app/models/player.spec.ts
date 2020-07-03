import { Player } from './player';

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player('John');
  });

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
});
