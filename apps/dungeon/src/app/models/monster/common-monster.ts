import { CommonMonsterType } from './common-monster-type';
import { Monster } from './monster';
import { IDamageEffect } from '../models';

export abstract class CommonMonster extends Monster {
  protected readonly _type: CommonMonsterType;
  protected readonly _baseDamage: number;
  protected _actualDamage: number;
  protected _positionInDungeon: number | undefined;
  
  constructor(
    type: CommonMonsterType,
    baseDamage: number,
  ) {
    super();
    this._type = type;
    this._baseDamage = baseDamage;
    this._actualDamage = this.baseDamage;
  }

  get baseDamage() {
    return this._baseDamage;
  }

  get type() {
    return this._type;
  }

  public get actualDamage() {
    return this._actualDamage;
  }

  public set actualDamage(newDamageValue: number) {
    this._actualDamage = newDamageValue;
  }

  public produceEffect(): IDamageEffect {
    return {
      type: 'damage',
      amount: this._actualDamage
    }
  }
}
