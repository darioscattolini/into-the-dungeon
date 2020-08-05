import { Skeleton } from './skeleton';
import { Monster } from '../monster';

describe('Skeleton', () => {
  let skeleton: Skeleton;

  beforeEach(() => {
    skeleton = new Skeleton();
  });

  test('class has static property maxAmount with value 2', () => {
    expect(Skeleton.maxAmount).toBe(2);
  });

  test('instance is created', () => {
    expect(skeleton).toBeTruthy();
  });

  test('it is instance of Skeleton', () => {
    expect(skeleton).toBeInstanceOf(Skeleton);
  });

  test('it is instance of Monster', () => {
    expect(skeleton).toBeInstanceOf(Monster);
  });
  
  test('it has type "Skeleton"', () => {
    expect(skeleton.type).toBe('Skeleton');
  });

  test('it has baseDamage of 2', () => {
    expect(skeleton.baseDamage).toBe(2);
  });
});
