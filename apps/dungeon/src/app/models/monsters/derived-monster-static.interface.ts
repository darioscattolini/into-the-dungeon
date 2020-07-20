import { Monster } from './monster';
import { HeroInterface } from '../heroes/hero-interface';

export interface IDerivedMonsterStatic {
  readonly maxAmount: 1 | 2;
  new(opponent: HeroInterface): Monster;
}
