import { Ally } from './ally';
import { Monster } from '../monster';
import { IHero } from '../../hero/hero.interface';

describe('Ally', () => {
  let ally: Ally;
  let opponent: IHero;

  beforeEach(() => {
    opponent = {
      equipment: [],
      getDamageModifiers() { return { first: [], second: [] } }
    };
    ally = new Ally(opponent);
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Ally.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance of Ally', () => {
    expect(ally instanceof Ally).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(ally instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Ally"', () => {
    expect(ally.type).toBe('Ally');
  });

  it('should create an instance with baseDamage of null', () => {
    expect(ally.baseDamage).toBe(null);
  });
});
