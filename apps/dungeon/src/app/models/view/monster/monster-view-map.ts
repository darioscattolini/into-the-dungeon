import { MonsterView } from './monster-view';
import { CommonMonsterType, RareMonsterType } from '../../models';
import { goblin } from './monsters/goblin';
import { skeleton } from './monsters/skeleton';
import { orc } from './monsters/orc';
import { vampire } from './monsters/vampire';
import { golem } from './monsters/golem';
import { litch } from './monsters/litch';
import { demon } from './monsters/demon';
import { dragon } from './monsters/dragon';
import { fairy } from './monsters/fairy';
import { ally } from './monsters/ally';
import { mimic } from './monsters/mimic';
import { jellyCube } from './monsters/jelly-cube';
import { dracula } from './monsters/dracula';
import { metamorph } from './monsters/metamorph';

type MonsterViewMap = {
  [key in CommonMonsterType | RareMonsterType]: Readonly<MonsterView>;
}

export const MonsterViewMap: Readonly<MonsterViewMap> = Object.freeze({
  Goblin: goblin,
  Skeleton: skeleton,
  Orc: orc,
  Vampire: vampire,
  Golem: golem,
  Litch: litch,
  Demon: demon,
  Dragon: dragon,
  Fairy: fairy,
  Ally: ally,
  Mimic: mimic,
  'Jelly Cube': jellyCube,
  Dracula: dracula,
  Metamorph: metamorph
});
