import { Dragon } from './dragon';
import { Monster } from '../monster';

describe('Dragon', () => {
  let dragon: Dragon;

  beforeEach(() => {
    dragon = new Dragon();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Dragon.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(dragon).toBeTruthy();
  });

  it('should create an instance of Dragon', () => {
    expect(dragon instanceof Dragon).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(dragon instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Dragon"', () => {
    expect(dragon.type).toBe('Dragon');
  });

  it('should create an instance with baseDamage of 9', () => {
    expect(dragon.baseDamage).toBe(9);
  });
});
