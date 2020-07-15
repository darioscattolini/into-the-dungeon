import { Monster } from './monster';
import { ConcreteMonsterStatic } from './concrete-monster-static';
import { HeroInterface } from '../heroes/hero-interface';
import { staticImplements } from '../../utilities';

@staticImplements<ConcreteMonsterStatic>()
export class Skeleton extends Monster {
  public static readonly maxAmount = 2;

  constructor(opponent: HeroInterface) {
    super('Skeleton', 2, opponent);
  }
};