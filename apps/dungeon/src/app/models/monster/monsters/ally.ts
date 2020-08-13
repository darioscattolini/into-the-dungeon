import { Monster } from '../monster';
import { DerivedMonsterStatic } from '../derived-monster-static';
import { staticImplements } from '../../../utilities';
import { RareMonsterType } from '../rare-monster-type';
import { AddCompanionEffect } from '../../models';

@staticImplements<DerivedMonsterStatic>()
export class Ally extends Monster {
  public static readonly maxAmount = 1;
  
  public get type() { return this._type; }
  protected readonly _type: RareMonsterType = 'ally';

  public get baseDamage() { return this._baseDamage; }
  protected readonly _baseDamage = null;
  
  public produceEffect(): AddCompanionEffect {
    return {
      type: 'companion',
      companion: 'ally'
    }
  }

  public startingAction(): null {
    return null;
  }
};
