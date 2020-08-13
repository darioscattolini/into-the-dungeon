import { CommonMonsterType } from './common-monster-type';
import { Monster } from './monster';
import { DamageEffect } from '../models';

export abstract class CommonMonster extends Monster {

  public get type() { return this._type; }
  protected readonly _type: CommonMonsterType;

  public get baseDamage() { return this._baseDamage; }
  protected readonly _baseDamage: number;

  public get actualDamage() { return this._actualDamage; }
  public set actualDamage(newValue: number) { this._actualDamage = newValue; }
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

  public produceEffect(): DamageEffect {
    return {
      type: 'damage',
      amount: this._actualDamage
    }
  }

  public startingAction(): null {
    return null;
  }
}
