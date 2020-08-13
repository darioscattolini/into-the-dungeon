import { CommonMonsterType, RareMonsterType } from '../../models';

export interface MonsterView {
  name: CommonMonsterType | RareMonsterType;
  damage: number | false;
  specialAction: string | false;
  image: string;
  description: string;
}
