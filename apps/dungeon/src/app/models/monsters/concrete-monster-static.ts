import { CommonMonster } from './common-monster';
import { RareMonster } from './rare-monster';
import { Monster } from './monster';
import { HeroInterface } from '../heroes/hero-interface';

export interface ConcreteMonsterStatic {
  readonly maxAmount: 1 | 2;
  new(opponent: HeroInterface): Monster;
}
