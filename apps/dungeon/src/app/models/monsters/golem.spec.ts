import { Golem } from './golem';
import { Monster } from './monster';
import { HeroInterface } from '../heroes/hero-interface';

describe('Golem', () => {
  let golem: Golem;
  let opponent: HeroInterface;

  beforeEach(() => {
    opponent = {
      equipment: [],
      getDamageModifiers() { return { first: [], second: [] } }
    }
    golem = new Golem(opponent);
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  });

  it('should have static property maxAmount with value 2', () => {
    expect(Golem.maxAmount).toBe(2);
  });

  it('should create an instance', () => {
    expect(golem).toBeTruthy();
  });

  it('should create an instance of Golem', () => {
    expect(golem instanceof Golem).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(golem instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Golem"', () => {
    expect(golem.type).toBe('Golem');
  });

  it('should create an instance with baseDamage of 5', () => {
    expect(golem.baseDamage).toBe(5);
  });
});
