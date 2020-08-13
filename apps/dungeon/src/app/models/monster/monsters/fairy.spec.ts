import { Fairy } from './fairy';
import { Monster } from '../monster';

describe('Fairy', () => {
  let fairy: Fairy;

  beforeEach(() => {
    fairy = new Fairy();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(Fairy.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(fairy).toBeTruthy();
  });

  test('it is instance of Fairy', () => {
    expect(fairy).toBeInstanceOf(Fairy);
  });

  test('it is instance of Monster', () => {
    expect(fairy).toBeInstanceOf(Monster);
  });
  
  test('it has type "fairy"', () => {
    expect(fairy.type).toEqualCaseInsensitive('fairy');
  });

  test('it has baseDamage of 0', () => {
    expect(fairy.baseDamage).toBe(0);
  });

  test('it keeps actualDamage of 0 after attempt to change it', () => {
    fairy.actualDamage = 4;
    expect(fairy.actualDamage).toBe(0);
  });

  test('it has a null startingAction', () => {
    expect(fairy.startingAction()).toBeNull();
  });
});
