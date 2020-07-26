import { Skeleton } from './skeleton';
import { Monster } from '../monster';

describe('Skeleton', () => {
  let skeleton: Skeleton;

  beforeEach(() => {
    skeleton = new Skeleton();
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
