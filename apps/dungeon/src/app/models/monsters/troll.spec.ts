import { Troll } from './troll';
import { Monster } from './monster';

describe('Troll', () => {
  let troll: Troll;

  beforeEach(() => {
    troll = new Troll();
  });

  it('should create an instance', () => {
    expect(troll).toBeTruthy();
  });

  it('should be an instance of Troll', () => {
    expect(troll instanceof Troll).toBe(true);
  });

  it('should be an instance of Monster', () => {
    expect(troll instanceof Monster).toBe(true);
  });
});
