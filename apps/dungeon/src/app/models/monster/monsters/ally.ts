import { Monster } from '../monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { staticImplements } from '../../../utilities';
import { RareMonsterType } from '../rare-monster-type';
import { IAddCompanionEffect } from '../../models';

@staticImplements<IDerivedMonsterStatic>()
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

  public produceEffect(): IAddCompanionEffect {
    return {
      type: 'companion',
      companion: 'Ally'
    }
  }
};
