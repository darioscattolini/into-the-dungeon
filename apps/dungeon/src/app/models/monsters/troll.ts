import { Monster } from './monster';
import { ConcreteMonsterStatic } from './concrete-monster-static';
import { HeroInterface } from '../heroes/hero-interface';
import { staticImplements } from '../../utilities';

@staticImplements<ConcreteMonsterStatic>()
export class Troll extends Monster {
  public static readonly type = 'Troll';
  public static readonly maxAmount = 2;

  constructor(opponent: HeroInterface) {
    super(1, opponent);
  }
};
