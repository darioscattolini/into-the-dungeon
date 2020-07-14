import { Troll } from './troll';
import { Monster } from './monster';
import { HeroInterface } from '../heroes/hero-interface';

describe('Troll', () => {
  let troll: Troll;
  let opponent: HeroInterface;

  beforeEach(() => {
    opponent = {
      equipment: [],
      getDamageModifiers() { return { first: [], second: [] } }
    }
    troll = new Troll(opponent);
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  });

  it('should create an instance', () => {
    expect(troll).toBeTruthy();
  });

  it('should create an instance of Troll', () => {
    expect(troll instanceof Troll).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(troll instanceof Monster).toBe(true);
  });

  it('should have static property type with value "Troll"', () => {
    expect(Troll.type).toBe('Troll');
  });

  it('should have static property baseDamage with value 1', () => {
    expect(Troll.baseDamage).toBe(1);
  });

  it('should have static property maxAmount with value 2', () => {
    expect(Troll.maxAmount).toBe(2);
  });
});
