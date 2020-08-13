import { Orc } from './orc';
import { Monster } from '../monster';

describe('Orc', () => {
  let orc: Orc;

  beforeEach(() => {
    orc = new Orc();
  });

  test('class has static property maxAmount with value 2', () => {
    expect(Orc.maxAmount).toBe(2);
  });

  test('instance is created', () => {
    expect(orc).toBeTruthy();
  });

  test('it is instance of Orc', () => {
    expect(orc).toBeInstanceOf(Orc);
  });

  test('it is instance of Monster', () => {
    expect(orc).toBeInstanceOf(Monster);
  });
  
  test('it has type "orc"', () => {
    expect(orc.type).toEqualCaseInsensitive('orc');
  });

  test('it has baseDamage of 3', () => {
    expect(orc.baseDamage).toBe(3);
  });
});
