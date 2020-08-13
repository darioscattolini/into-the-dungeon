import { Ally } from './ally';
import { Monster } from '../monster';

describe('Ally', () => {
  let ally: Ally;

  beforeEach(() => {
    ally = new Ally();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(Ally.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(ally).toBeTruthy();
  });

  test('it is instance of Ally', () => {
    expect(ally).toBeInstanceOf(Ally);
  });

  test('it is instance of Monster', () => {
    expect(ally).toBeInstanceOf(Monster);
  });
  
  test('it has type "ally"', () => {
    expect(ally.type).toEqualCaseInsensitive('ally');
  });

  test('it has baseDamage of null', () => {
    expect(ally.baseDamage).toBe(null);
  });

  test('it produces a companion: ally effect', () => {
    expect(ally.produceEffect()).toEqual({
      type: 'companion',
      companion: 'ally'
    });
  });

  test('it has a null startingAction', () => {
    expect(ally.startingAction()).toBeNull();
  });
});
