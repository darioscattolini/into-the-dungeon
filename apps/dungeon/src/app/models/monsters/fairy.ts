import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { IHero } from '../heroes/hero.interface';
import { staticImplements } from '../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Fairy extends Monster {
  public static readonly maxAmount = 1;

  constructor(opponent: IHero) {
    super('Fairy', 0, opponent);
    this._actualDamage = 0;
  }
};
