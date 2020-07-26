import { Goblin } from './goblin';
import { Monster } from '../monster';

describe('Goblin', () => {
  let goblin: Goblin;

  beforeEach(() => {
    goblin = new Goblin();
  });

  it('should have static property maxAmount with value 2', () => {
    expect(Goblin.maxAmount).toBe(2);
  });

  it('should create an instance', () => {
    expect(goblin).toBeTruthy();
  });

  it('should create an instance of Goblin', () => {
    expect(goblin instanceof Goblin).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(goblin instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Goblin"', () => {
    expect(goblin.type).toBe('Goblin');
  });

  it('should create an instance with baseDamage of 1', () => {
    expect(goblin.baseDamage).toBe(1);
  });
});
