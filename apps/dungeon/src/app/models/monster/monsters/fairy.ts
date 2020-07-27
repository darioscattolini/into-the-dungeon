import { Monster } from '../monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { staticImplements } from '../../../utilities';
import { RareMonsterType } from '../rare-monster-type';
import { IDamageEffect } from '../../models';

@staticImplements<IDerivedMonsterStatic>()
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

  public produceEffect(): IDamageEffect {
    return {
      type: 'damage',
      amount: this.actualDamage
    }
  }

  public startingAction(): null {
    return null;
  }
};
