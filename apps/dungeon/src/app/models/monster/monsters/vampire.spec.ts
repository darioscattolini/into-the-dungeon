import { Vampire } from './vampire';
import { Monster } from '../monster';

describe('Vampire', () => {
  let vampire: Vampire;

  beforeEach(() => {
    vampire = new Vampire();
  });

  it('should have static property maxAmount with value 2', () => {
    expect(Vampire.maxAmount).toBe(2);
  });

  it('should create an instance', () => {
    expect(vampire).toBeTruthy();
  });

  it('should create an instance of Vampire', () => {
    expect(vampire instanceof Vampire).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(vampire instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Vampire"', () => {
    expect(vampire.type).toBe('Vampire');
  });

  it('should create an instance with baseDamage of 4', () => {
    expect(vampire.baseDamage).toBe(4);
  });
});
