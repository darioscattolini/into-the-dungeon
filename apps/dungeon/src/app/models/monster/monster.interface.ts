import { CommonMonster } from './common-monster';
import { RareMonster } from './rare-monster';
import { Hero } from '../models';

export interface IMonster {
  readonly type: CommonMonster | RareMonster;
  readonly baseDamage: number | null;
  readonly opponent: Hero;
  readonly positionInDungeon: number;
  actualDamage: number;
}
