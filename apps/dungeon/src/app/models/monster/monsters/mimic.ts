import { Monster, ITransformationEffect, IDamageEffect } from '../../models';
import { RareMonsterType } from '../rare-monster-type';
import { staticImplements } from '../../../utilities';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';

@staticImplements<IDerivedMonsterStatic>()
export class Mimic extends Monster {
  public static readonly maxAmount = 1;
  
  protected readonly _type: RareMonsterType = 'Mimic';
  protected _baseDamage: number | null = null;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public produceEffect(): IDamageEffect {
    if (this.baseDamage === null) {
      throw new Error('Mimic must transform before attacking');
    }
    return {
      type: 'damage',
      amount: this.baseDamage
    }
  }

  public startingAction(): ITransformationEffect {
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
