import { Monster } from './monster';
import { Hero } from '../models';

export interface IDerivedMonsterStatic {
  readonly maxAmount: 1 | 2;
  new(opponent: Hero): Monster;
}
