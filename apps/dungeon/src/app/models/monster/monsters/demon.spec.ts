import { Demon } from './demon';
import { Monster } from '../monster';

describe('Demon', () => {
  let demon: Demon;

  beforeEach(() => {
    demon = new Demon();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(Demon.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(demon).toBeTruthy();
  });

  test('it is instance of Demon', () => {
    expect(demon).toBeInstanceOf(Demon);
  });

  test('it is instance of Monster', () => {
    expect(demon).toBeInstanceOf(Monster);
  });
  
  test('it has type "demon"', () => {
    expect(demon.type).toEqualCaseInsensitive('demon');
  });

  test('it has baseDamage of 7', () => {
    expect(demon.baseDamage).toBe(7);
  });
});
