import { CommonMonster } from './common-monster';
import { Monster } from './monster';

const MockOrc = class extends CommonMonster {
  constructor() {
    super('Orc', 3);
  }
};

describe('Monster', () => {
  let monster: CommonMonster;

  beforeEach(() => {
    monster = new MockOrc();
  });

  test('its extension creates instance', () => {
    expect(monster).toBeTruthy();
  });

  test('it is instance of CommonMonster', () => {
    expect(monster).toBeInstanceOf(CommonMonster);
  });

  test('it is instance of Monster', () => {
    expect(monster).toBeInstanceOf(Monster);
  });

  test('it has a non-nil type', () => {
    expect(monster.type).not.toBeNil();
  });

  test('it has a numeric baseDamage', () => {
    expect(monster.baseDamage).toBeNumber();
  });

  test('it has a numeric actualDamage', () => {
    expect(monster.actualDamage).toBeNumber();
  });

  test('its actualDamage equals baseDamage by default', () => {
    expect(monster.actualDamage).toBe(monster.baseDamage);
  });

  test('its actualDamage can be set to a different value', () => {
    const oldDamageValue = monster.actualDamage;
    const newDamageValue = oldDamageValue * 2;
    monster.actualDamage = newDamageValue;
    expect(monster.actualDamage).not.toBe(oldDamageValue);
  });

  test('its has a damage effect', () => {
    expect(monster.produceEffect().type).toEqual('damage');
  });

  test('its damage effect has amount equal to actualDamage', () => {
    const oldDamageValue = monster.actualDamage;
    expect(monster.produceEffect().amount).toEqual(oldDamageValue);
    const newDamageValue = oldDamageValue * 2;
    monster.actualDamage = newDamageValue;
    expect(monster.produceEffect().amount).toBe(newDamageValue);
  });

  test('it has a null startingAction', () => {
    expect(monster.startingAction()).toBeNull();
  });
});
