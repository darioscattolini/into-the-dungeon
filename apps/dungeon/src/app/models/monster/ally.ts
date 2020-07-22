import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { IHero } from '../hero/hero.interface';
import { staticImplements } from '../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Ally extends Monster {
  public static readonly maxAmount = 1;

  constructor(opponent: IHero) {
    super('Ally', null, opponent);
  }
};
