import { Monster, TransformationEffect, DamageEffect } from '../../models';
import { RareMonsterType } from '../rare-monster-type';
import { staticImplements } from '../../../utilities';
import { DerivedMonsterStatic } from '../derived-monster-static';

@staticImplements<DerivedMonsterStatic>()
export class Mimic extends Monster {
  public static readonly maxAmount = 1;
  
  public get type() { return this._type; }
  protected readonly _type: RareMonsterType = 'mimic';

  public get baseDamage() { return this._baseDamage; }
  protected _baseDamage: number | null = null;

  public produceEffect(): DamageEffect {
    if (this.baseDamage === null) {
      throw new Error('Mimic must transform before attacking');
    }
    return {
      type: 'damage',
      amount: this.baseDamage
    }
  }

  public startingAction(): TransformationEffect {
    return {
      type: 'transformation',
      parameter: 'equipmentSize',
      transformer: (equipmentSize: number) => {
        if (equipmentSize < 0) {
          throw new Error('Players cannot have less than 0 pieces of equipment');
        }

        if (equipmentSize > 6) {
          throw new Error('Players cannot have more than 6 pieces of equipment');
        }

        this._baseDamage = equipmentSize;
        return this;
      }
    }
  }
}
