import { Litch } from './litch';
import { Monster } from '../monster';

describe('Litch', () => {
  let litch: Litch;

  beforeEach(() => {
    litch = new Litch();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(Litch.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(litch).toBeTruthy();
  });

  test('it is instance of Litch', () => {
    expect(litch).toBeInstanceOf(Litch);
  });

  test('it is instance of Monster', () => {
    expect(litch).toBeInstanceOf(Monster);
  });
  
  test('it has type "Litch"', () => {
    expect(litch.type).toBe('Litch');
  });

  test('it has baseDamage of 6', () => {
    expect(litch.baseDamage).toBe(6);
  });
});
