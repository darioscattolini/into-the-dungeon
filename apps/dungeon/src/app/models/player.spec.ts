import { Player } from './player';

describe('Player', () => {
  it('should create instance', () => {
    expect(new Player('John')).toBeTruthy();
  });

  it('should create instance named "John" for that constructor parameter', () => {
    const player = new Player('John');
    expect(player.name).toBe('John');
  })

});
