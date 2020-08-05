import { Golem } from './golem';
import { Monster } from '../monster';

describe('Golem', () => {
  let golem: Golem;

  beforeEach(() => {
    golem = new Golem();
  });

  test('class has static property maxAmount with value 2', () => {
    expect(Golem.maxAmount).toBe(2);
  });

  test('instance is created', () => {
    expect(golem).toBeTruthy();
  });

  test('it is instance of Golem', () => {
    expect(golem).toBeInstanceOf(Golem);
  });

  test('it is instance of Monster', () => {
    expect(golem).toBeInstanceOf(Monster);
  });
  
  test('it has type "Golem"', () => {
    expect(golem.type).toBe('Golem');
  });

  test('it has baseDamage of 5', () => {
    expect(golem.baseDamage).toBe(5);
  });
});
