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
  goblin: goblin,
  skeleton: skeleton,
  orc: orc,
  vampire: vampire,
  golem: golem,
  litch: litch,
  demon: demon,
  dragon: dragon,
  fairy: fairy,
  ally: ally,
  mimic: mimic,
  'jelly cube': jellyCube,
  dracula: dracula,
  metamorph: metamorph
});
