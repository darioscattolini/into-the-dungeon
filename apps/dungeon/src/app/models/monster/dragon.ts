import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { IHero } from '../hero/hero.interface';
import { staticImplements } from '../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Dragon extends Monster {
  public static readonly maxAmount = 1;

  constructor(opponent: IHero) {
    super('Dragon', 9, opponent);
  }
};
