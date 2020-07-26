import { Monster } from './monster';

export interface IDerivedMonsterStatic {
  readonly maxAmount: 1 | 2;
  new(): Monster;
}
