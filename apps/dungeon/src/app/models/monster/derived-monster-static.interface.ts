import { Monster } from './monster';
import { IHero } from '../hero/hero.interface';

export interface IDerivedMonsterStatic {
  readonly maxAmount: 1 | 2;
  new(opponent: IHero): Monster;
}
