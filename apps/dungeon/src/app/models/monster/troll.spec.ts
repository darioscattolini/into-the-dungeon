import { Troll } from './troll';
import { Monster } from './monster';
import { IHero } from '../heroes/hero.interface';

describe('Troll', () => {
  let troll: Troll;
  let opponent: IHero;

  beforeEach(() => {
    opponent = {
      equipment: [],
      getDamageModifiers() { return { first: [], second: [] } }
    };
    troll = new Troll(opponent);
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  });

  it('should have static property maxAmount with value 2', () => {
    expect(Troll.maxAmount).toBe(2);
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
  
  it('should create an instance with type "Troll"', () => {
    expect(troll.type).toBe('Troll');
  });

  it('should create an instance with baseDamage of 1', () => {
    expect(troll.baseDamage).toBe(1);
  });
});
