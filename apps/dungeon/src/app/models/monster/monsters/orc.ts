import { Monster } from '../monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { IHero } from '../../hero/hero.interface';
import { staticImplements } from '../../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Orc extends Monster {
  public static readonly maxAmount = 2;

  constructor(opponent: IHero) {
    super('Orc', 3, opponent);
  }
};
