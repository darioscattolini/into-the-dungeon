import { Monster, ITransformationEffect, IDamageEffect, Player } from '../../models';
import { RareMonsterType } from '../rare-monster-type';
import { CommonMonsterType } from '../common-monster-type';
import { staticImplements } from '../../../utilities';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';

@staticImplements<IDerivedMonsterStatic>()
export class Dracula extends Monster {
  public static readonly maxAmount = 1;
  
  protected _type: CommonMonsterType | RareMonsterType = 'Vampire';
  protected _baseDamage = 4;

  private formChecked = false;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public produceEffect(): IDamageEffect {
    if (!this.formChecked) throw new Error('Dracula must check its form before attacking');
    return {
      type: 'damage',
      amount: this.baseDamage
    }
  }

  public startingAction(): ITransformationEffect {
    this.formChecked = true;
    return {
      type: 'transformation',
      parameter: 'playersVictories',
      transformer: (playersVictories: number) => {
        if (playersVictories === 1) {
          this._type = 'Dracula';
          this._baseDamage = 8;
        }
        return this;
      }
    }
  }
}
