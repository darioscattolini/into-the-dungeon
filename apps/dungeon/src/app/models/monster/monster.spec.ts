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

  public produceEffect(): MonsterEffect {
    return {
      type: 'equipment',
      effect: 'remove'
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

  it('should create orc (through MockOrc extension)', () => {
    expect(orc).toBeTruthy();
  });

  it('should create instances of Monster', () => {
    expect(orc instanceof Monster).toBe(true);
    expect(jellyCube instanceof Monster).toBe(true);
  });

  it('should create instances with definite type', () => {
    expect(orc.type).toBeDefined();
    expect(jellyCube.type).toBeDefined();
  });

  it('should create instances with definite baseDamage', () => {
    expect(orc.baseDamage).toBeDefined();
    expect(jellyCube.baseDamage).toBeDefined();
  });

  it('should allow monsters with null baseDamage', () => {
    expect(jellyCube.baseDamage).toBe(null);
  });

  it('should create instances with positionInDungeon undefined by default', () => {
    expect(orc.positionInDungeon).not.toBeDefined();
    expect(jellyCube.positionInDungeon).not.toBeDefined();
  });

  it('should change positionInDungeon to 2 for monster added to dungeon in position 2', () => {
    orc.addToDungeonInPosition(2);
    expect(orc.positionInDungeon).toBe(2);
  });

  it('should create instances with definite effect', () => {
    expect(orc.produceEffect()).toBeDefined();
    expect(jellyCube.produceEffect()).toBeDefined();
  });
});
