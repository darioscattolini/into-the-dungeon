import { CommonMonster } from './common-monster';
import { RareMonster } from './rare-monster';
import { Monster } from './monster';
import { Hero } from '../heroes/hero';

export interface ConcreteMonsterStatic {
  readonly type: CommonMonster | RareMonster;
  readonly baseDamage: number | null;
  readonly maxAmount: 1 | 2;
  new(opponent: Hero): Monster;
}
