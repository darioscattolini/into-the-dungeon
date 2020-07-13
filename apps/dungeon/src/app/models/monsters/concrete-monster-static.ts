import { CommonMonster } from './common-monster';
import { RareMonster } from './rare-monster';
import { Monster } from './monster';
import { Hero } from '../heroes/hero';

export interface ConcreteMonsterStatic {
  type: CommonMonster | RareMonster;
  baseDamage: number | null;
  maxAmount: 1 | 2;
  new (opponent: Hero): Monster;
}
