import { Skeleton } from './skeleton';
import { Monster } from './monster';
import { IHero } from '../heroes/hero.interface';

describe('Skeleton', () => {
  let skeleton: Skeleton;
  let opponent: IHero;

  beforeEach(() => {
    opponent = {
      equipment: [],
      getDamageModifiers() { return { first: [], second: [] } }
    };
    skeleton = new Skeleton(opponent);
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  });

  it('should have static property maxAmount with value 2', () => {
    expect(Skeleton.maxAmount).toBe(2);
  });

  it('should create an instance', () => {
    expect(skeleton).toBeTruthy();
  });

  it('should create an instance of Skeleton', () => {
    expect(skeleton instanceof Skeleton).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(skeleton instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Skeleton"', () => {
    expect(skeleton.type).toBe('Skeleton');
  });

  it('should create an instance with baseDamage of 2', () => {
    expect(skeleton.baseDamage).toBe(2);
  });
});
