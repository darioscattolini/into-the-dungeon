import { Monster } from './monster';
import { IHero } from '../heroes/hero.interface';

export interface IDerivedMonsterStatic {
  readonly maxAmount: 1 | 2;
  new(opponent: IHero): Monster;
}
