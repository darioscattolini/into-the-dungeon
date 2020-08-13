import { Monster } from '../monster';
import { DerivedMonsterStatic } from '../derived-monster-static';
import { staticImplements } from '../../../utilities';
import { RareMonsterType } from '../rare-monster-type';
import { LoseEquipmentEffect } from '../../models';

@staticImplements<DerivedMonsterStatic>()
export class JellyCube extends Monster {
  public static readonly maxAmount = 1;
  
  protected readonly _type: RareMonsterType = 'Jelly Cube';
  protected readonly _baseDamage = null;
  
  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public produceEffect(): LoseEquipmentEffect {
    return {
      type: 'equipment',
      lose: 'any'
    }
  }

  public startingAction(): null {
    return null;
  }
};
