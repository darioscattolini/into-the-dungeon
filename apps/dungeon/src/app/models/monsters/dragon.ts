import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { HeroInterface } from '../heroes/hero-interface';
import { staticImplements } from '../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Dragon extends Monster {
  public static readonly maxAmount = 1;

  constructor(opponent: HeroInterface) {
    super('Dragon', 9, opponent);
  }
};
