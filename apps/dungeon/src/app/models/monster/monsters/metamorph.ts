import { Monster, TransformationEffect, DamageEffect } from '../../models';
import { RareMonsterType } from '../rare-monster-type';
import { staticImplements } from '../../../utilities';
import { DerivedMonsterStatic } from '../derived-monster-static';
import { Fairy } from './fairy';
import { Goblin } from './goblin';
import { Skeleton } from './skeleton';
import { Orc } from './orc';
import { Vampire } from './vampire';
import { Golem } from './golem';
import { Litch } from './litch';
import { Demon } from './demon';
import { Dracula } from './dracula';
import { Dragon } from './dragon';

@staticImplements<DerivedMonsterStatic>()
export class Metamorph extends Monster {
  public static readonly maxAmount = 1;
  
  protected _type: RareMonsterType = 'Metamorph';
  protected _baseDamage: number | null = null;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }

  public produceEffect(): DamageEffect {
    if (!this._baseDamage) throw new Error('Metamorph must adopt a new form before attacking');
    return {
      type: 'damage',
      amount: this._baseDamage
    }
  }

  public startingAction(): TransformationEffect {
    return {
      type: 'transformation',
      parameter: 'positionInDungeon',
      transformer: (positionInDungeon: number) => {
        if (positionInDungeon < 1) {
          throw new Error('Metamorph cannot have a position under 1');
        }
        const MonsterClasses: DerivedMonsterStatic[] = [
          Fairy,
          Goblin,
          Skeleton,
          Orc,
          Vampire,
          Golem,
          Litch,
          Demon,
          Dracula,
          Dragon
        ];

        let monster: Monster;

        if (positionInDungeon === 8) {
          monster = new Dracula();
          monster = (monster as Dracula).startingAction().transformer(1);
        } else if (positionInDungeon >= 10) {
          monster = this;
          this._baseDamage = positionInDungeon;
        } else {
          monster = new MonsterClasses[positionInDungeon]();
        }

        return monster;
      }
    }
  }
}
