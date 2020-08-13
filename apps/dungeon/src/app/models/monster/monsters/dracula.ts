import { Monster, TransformationEffect, DamageEffect } from '../../models';
import { RareMonsterType } from '../rare-monster-type';
import { CommonMonsterType } from '../common-monster-type';
import { staticImplements } from '../../../utilities';
import { DerivedMonsterStatic } from '../derived-monster-static';

@staticImplements<DerivedMonsterStatic>()
export class Dracula extends Monster {
  public static readonly maxAmount = 1;
  
  protected _type: CommonMonsterType | RareMonsterType = 'Dracula';
  protected _baseDamage = 8;

  private formChecked = false;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public produceEffect(): DamageEffect {
    if (!this.formChecked) throw new Error('Dracula must check its form before attacking');
    return {
      type: 'damage',
      amount: this.baseDamage
    }
  }

  public startingAction(): TransformationEffect {
    this.formChecked = true;
    return {
      type: 'transformation',
      parameter: 'playersVictories',
      transformer: (playersVictories: number) => {
        if (playersVictories < 0 || playersVictories > 1) {
          throw new Error('Players can have only 0 or 1 victories');
        }
        if (playersVictories === 0) {
          this._type = 'Vampire';
          this._baseDamage = 4;
        }
        return this;
      }
    }
  }
}
