import { Monster } from './monster';
import { ConcreteMonsterStatic } from './concrete-monster-static';
import { HeroInterface } from '../heroes/hero-interface';

// tslint:disable-next-line: no-shadowed-variable
const Troll: ConcreteMonsterStatic = class Troll extends Monster {
  public static readonly type = 'Troll';
  public static readonly baseDamage = 1;
  public static readonly maxAmount = 2;

  constructor(opponent: HeroInterface) {
    super(opponent);
  }
}

export { Troll };