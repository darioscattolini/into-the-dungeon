import { Fairy } from './fairy';
import { Monster } from '../monster';

describe('Fairy', () => {
  let fairy: Fairy;

  beforeEach(() => {
    fairy = new Fairy();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Fairy.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(fairy).toBeTruthy();
  });

  it('should create an instance of Fairy', () => {
    expect(fairy instanceof Fairy).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(fairy instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Fairy"', () => {
    expect(fairy.type).toBe('Fairy');
  });

  it('should create an instance with baseDamage of 0', () => {
    expect(fairy.baseDamage).toBe(0);
  });

  it('should have actualDamage of 0 even if attempting to set it to different value', () => {
    fairy.actualDamage = 4;
    expect(fairy.actualDamage).toBe(0);
  });
});
