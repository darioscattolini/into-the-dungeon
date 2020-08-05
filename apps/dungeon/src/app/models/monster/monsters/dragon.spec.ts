import { Dragon } from './dragon';
import { Monster } from '../monster';

describe('Dragon', () => {
  let dragon: Dragon;

  beforeEach(() => {
    dragon = new Dragon();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(Dragon.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(dragon).toBeTruthy();
  });

  test('it is instance of Dragon', () => {
    expect(dragon).toBeInstanceOf(Dragon);
  });

  test('it is instance of Monster', () => {
    expect(dragon).toBeInstanceOf(Monster);
  });
  
  test('it has type "Dragon"', () => {
    expect(dragon.type).toBe('Dragon');
  });

  test('it has baseDamage of 9', () => {
    expect(dragon.baseDamage).toBe(9);
  });
});
