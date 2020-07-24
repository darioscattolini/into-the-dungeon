import { Monster } from '../monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { Hero } from '../../models';
import { staticImplements } from '../../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Vampire extends Monster {
  public static readonly maxAmount = 2;

  constructor(opponent: Hero) {
    super('Vampire', 4, opponent);
  }
};
