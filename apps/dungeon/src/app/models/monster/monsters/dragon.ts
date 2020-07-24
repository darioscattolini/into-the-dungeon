import { Monster } from '../monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { Hero } from '../../models';
import { staticImplements } from '../../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Dragon extends Monster {
  public static readonly maxAmount = 1;

  constructor(opponent: Hero) {
    super('Dragon', 9, opponent);
  }
};
