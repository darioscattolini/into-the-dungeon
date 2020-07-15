import { Monster } from './monster';
import { ConcreteMonsterStatic } from './concrete-monster-static';
import { HeroInterface } from '../heroes/hero-interface';
import { staticImplements } from '../../utilities';

@staticImplements<ConcreteMonsterStatic>()
export class Dragon extends Monster {
  public static readonly maxAmount = 1;

  constructor(opponent: HeroInterface) {
    super('Dragon', 9, opponent);
  }
};
