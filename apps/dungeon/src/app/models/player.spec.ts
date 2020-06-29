import { Player } from './player';

describe('Player', () => {
  it('should create instance', () => {
    expect(new Player('John')).toBeTruthy();
  });

  it('should create instance named "John" for that constructor parameter', () => {
    const player = new Player('John');
    expect(player.name).toBe('John');
  });

  it('should not create a player with empty name', () => {
    expect(() => { const player = new Player(''); })
      .toThrow(new Error('Player\'s names should have at least one character'));
  });

});
