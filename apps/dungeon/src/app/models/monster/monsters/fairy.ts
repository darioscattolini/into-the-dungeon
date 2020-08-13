import { Monster } from '../monster';
import { DerivedMonsterStatic } from '../derived-monster-static';
import { staticImplements } from '../../../utilities';
import { RareMonsterType } from '../rare-monster-type';
import { DamageEffect } from '../../models';

@staticImplements<DerivedMonsterStatic>()
export class Fairy extends Monster {
  public static readonly maxAmount = 1;

  protected readonly _type: RareMonsterType = 'Fairy';
  protected readonly _baseDamage = 0;
  
  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  get actualDamage() {
    return this.baseDamage;
  }

  set actualDamage(newDamageValue: number) { }

  public produceEffect(): DamageEffect {
    return {
      type: 'damage',
      amount: this.actualDamage
    }
  }

  public startingAction(): null {
    return null;
  }
};
