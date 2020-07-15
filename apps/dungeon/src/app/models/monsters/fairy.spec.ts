import { Fairy } from './fairy';
import { Monster } from './monster';
import { HeroInterface } from '../heroes/hero-interface';

describe('Fairy', () => {
  let fairy: Fairy;
  let opponent: HeroInterface;

  beforeEach(() => {
    opponent = {
      equipment: [],
      getDamageModifiers() { 
        return { 
          first: [ (baseDamage: number) => baseDamage % 2 === 1 ? 1 : 2 ], 
          second: []
        }
      }
    }
    fairy = new Fairy(opponent);
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
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

  it('should have actualDamage of 0 irrespective of opponent equipment', () => {
    expect(fairy.actualDamage).toBe(0);
  })
});
