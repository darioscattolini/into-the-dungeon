import { Monster } from '../monster';
import { DerivedMonsterStatic } from '../derived-monster-static';
import { staticImplements } from '../../../utilities';
import { RareMonsterType } from '../rare-monster-type';
import { AddCompanionEffect } from '../../models';

@staticImplements<DerivedMonsterStatic>()
export class Ally extends Monster {
  public static readonly maxAmount = 1;
  
  protected readonly _type: RareMonsterType = 'Ally';
  protected readonly _baseDamage = null;
  
  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public produceEffect(): AddCompanionEffect {
    return {
      type: 'companion',
      companion: 'Ally'
    }
  }

  public startingAction(): null {
    return null;
  }
};
