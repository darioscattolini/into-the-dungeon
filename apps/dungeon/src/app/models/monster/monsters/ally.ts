import { Monster } from '../monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { Hero } from '../../models';
import { staticImplements } from '../../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Ally extends Monster {
  public static readonly maxAmount = 1;

  constructor(opponent: Hero) {
    super('Ally', null, opponent);
  }
};
