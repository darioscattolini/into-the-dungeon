import { JellyCube } from './jelly-cube';
import { Monster } from '../monster';

describe('JellyCube', () => {
  let jellyCube: JellyCube;

  beforeEach(() => {
    jellyCube = new JellyCube();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(JellyCube.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(jellyCube).toBeTruthy();
  });

  test('it is instance of JellyCube', () => {
    expect(jellyCube).toBeInstanceOf(JellyCube);
  });

  test('it is instance of Monster', () => {
    expect(jellyCube).toBeInstanceOf(Monster);
  });
  
  test('it has type "Jelly Cube"', () => {
    expect(jellyCube.type).toBe('Jelly Cube');
  });

  test('it has baseDamage of null', () => {
    expect(jellyCube.baseDamage).toBe(null);
  });

  test('it produces a lose equipment effect', () => {
    expect(jellyCube.produceEffect()).toEqual({
      type: 'equipment',
      lose: 'any'
    });
  });

  test('it has a null startingAction', () => {
    expect(jellyCube.startingAction()).toBeNull();
  });
});
