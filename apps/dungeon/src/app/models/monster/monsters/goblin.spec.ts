import { Goblin } from './goblin';
import { Monster } from '../monster';

describe('Goblin', () => {
  let goblin: Goblin;

  beforeEach(() => {
    goblin = new Goblin();
  });

  test('class has static property maxAmount with value 2', () => {
    expect(Goblin.maxAmount).toBe(2);
  });

  test('instance is created', () => {
    expect(goblin).toBeTruthy();
  });

  test('it is instance of Goblin', () => {
    expect(goblin).toBeInstanceOf(Goblin);
  });

  test('it is instance of Monster', () => {
    expect(goblin).toBeInstanceOf(Monster);
  });
  
  test('it has type "Goblin"', () => {
    expect(goblin.type).toBe('Goblin');
  });

  test('it has baseDamage of 1', () => {
    expect(goblin.baseDamage).toBe(1);
  });
});
