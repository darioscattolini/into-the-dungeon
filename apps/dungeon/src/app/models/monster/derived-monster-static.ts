import { Monster } from './monster';

export interface DerivedMonsterStatic {
  readonly maxAmount: 1 | 2;
  new(): Monster;
}
