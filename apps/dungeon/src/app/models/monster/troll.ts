import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { IHero } from '../hero/hero.interface';
import { staticImplements } from '../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Troll extends Monster {
  public static readonly maxAmount = 2;

  constructor(opponent: IHero) {
    super('Troll', 1, opponent);
  }
};
