import { Liche } from './liche';
import { Monster } from '../monster';
import { Hero } from '../../models';

describe('Liche', () => {
  let liche: Liche;
  let opponent: Hero;

  beforeEach(() => {
    opponent = {
      equipment: [],
      getDamageModifiers() { return { first: [], second: [] } }
    };
    liche = new Liche(opponent);
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Liche.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(liche).toBeTruthy();
  });

  it('should create an instance of Liche', () => {
    expect(liche instanceof Liche).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(liche instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Liche"', () => {
    expect(liche.type).toBe('Liche');
  });

  it('should create an instance with baseDamage of 6', () => {
    expect(liche.baseDamage).toBe(6);
  });
});
