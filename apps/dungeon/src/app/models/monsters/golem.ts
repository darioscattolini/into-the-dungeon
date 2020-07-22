import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { IHero } from '../heroes/hero.interface';
import { staticImplements } from '../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Golem extends Monster {
  public static readonly maxAmount = 2;

  constructor(opponent: IHero) {
    super('Golem', 5, opponent);
  }
};
