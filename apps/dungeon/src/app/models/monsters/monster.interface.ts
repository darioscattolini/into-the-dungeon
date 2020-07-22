import { CommonMonster } from './common-monster';
import { RareMonster } from './rare-monster';
import { IHero } from '../heroes/hero.interface';

export interface IMonster {
  readonly type: CommonMonster | RareMonster;
  readonly baseDamage: number | null;
  readonly opponent: IHero;
  readonly positionInDungeon: number;
  actualDamage: number;
}
