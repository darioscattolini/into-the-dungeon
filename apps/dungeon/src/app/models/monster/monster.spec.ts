import { Monster } from './monster';
import { CommonMonsterType } from './common-monster-type';
import { RareMonsterType } from './rare-monster-type';
import { MonsterEffect } from '../models';

const MockOrc = class extends Monster {
  protected readonly _type: CommonMonsterType = 'Orc';
  protected readonly _baseDamage = 3;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public startingAction() {
    return null;
  }

  public produceEffect(): MonsterEffect {
    return {
      type: 'damage',
      amount: this._baseDamage
    }
  }

};

const MockJellyCube = class extends Monster {
  protected readonly _type: RareMonsterType = 'Jelly Cube';
  protected readonly _baseDamage = null;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public startingAction(): MonsterEffect {
    return {
      type: 'damage',
      amount: 1
    }
  }

  public produceEffect(): MonsterEffect {
    return {
      type: 'equipment',
      lose: 'any'
    }
  }
};

describe('Monster', () => {
  let orc: Monster;
  let jellyCube: Monster;

  beforeEach(() => {
    orc = new MockOrc();
    jellyCube = new MockJellyCube();
  });

  test('its extensions create instances', () => {
    expect(orc).toBeTruthy();
    expect(jellyCube).toBeTruthy();
  });

  test('its extensions create instances of Monster', () => {
    expect(orc).toBeInstanceOf(Monster);
    expect(jellyCube).toBeInstanceOf(Monster);
  });

  test('they have a non-nil type', () => {
    expect(orc.type).not.toBeNil();
    expect(jellyCube.type).not.toBeNil();
  });

  test('they have a definite baseDamage', () => {
    expect(orc.baseDamage).toBeDefined();
    expect(jellyCube.baseDamage).toBeDefined();
  });

  test('that some monsters can have null baseDamage', () => {
    expect(jellyCube.baseDamage).toBe(null);
  });

  test('that their positionInDungeon is undefined by default', () => {
    expect(orc.positionInDungeon).toBeUndefined();
    expect(jellyCube.positionInDungeon).toBeUndefined();
  });

  test('that positionInDungeon is specified when added to dungeon', () => {
    orc.addToDungeonInPosition(2);
    expect(orc.positionInDungeon).toBe(2);
  });

  test('they have a non-nil effect', () => {
    expect(orc.produceEffect()).not.toBeNil();
    expect(jellyCube.produceEffect()).not.toBeNil();
  });

  test('that some monsters can have null startingAction', () => {
    expect(orc.startingAction()).toBeNull();
  });

  test('that some monsters can have a non-nil startingAction', () => {
    expect(jellyCube.startingAction()).not.toBeNil();
  });
});
