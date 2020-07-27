import { Monster, ITransformationEffect, IDamageEffect, Hero } from '../../models';
import { RareMonsterType } from '../rare-monster-type';
import { staticImplements } from '../../../utilities';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';

@staticImplements<IDerivedMonsterStatic>()
export class Mimic extends Monster {
  public static readonly maxAmount = 1;
  
  protected _type: RareMonsterType = 'Mimic';
  protected _baseDamage: number | null = null;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public produceEffect(): IDamageEffect {
    if (this.baseDamage === null) throw new Error('Mimic must transform before attacking');
    return {
      type: 'damage',
      amount: this.baseDamage
    }
  }

  public startingAction(): ITransformationEffect {
    return {
      type: 'transformation',
      parameter: 'hero',
      transformer: (hero: Hero) => {
        this._baseDamage = hero.equipmentSize;
        return this as Mimic;
      }
    }
  }
}
