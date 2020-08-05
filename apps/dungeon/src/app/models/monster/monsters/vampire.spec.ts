import { Vampire } from './vampire';
import { Monster } from '../monster';

describe('Vampire', () => {
  let vampire: Vampire;

  beforeEach(() => {
    vampire = new Vampire();
  });

  test('class has static property maxAmount with value 2', () => {
    expect(Vampire.maxAmount).toBe(2);
  });

  test('instance is created', () => {
    expect(vampire).toBeTruthy();
  });

  test('it is instance of Vampire', () => {
    expect(vampire).toBeInstanceOf(Vampire);
  });

  test('it is instance of Monster', () => {
    expect(vampire).toBeInstanceOf(Monster);
  });
  
  test('it has type "Vampire"', () => {
    expect(vampire.type).toBe('Vampire');
  });

  test('it has baseDamage of 4', () => {
    expect(vampire.baseDamage).toBe(4);
  });
});
