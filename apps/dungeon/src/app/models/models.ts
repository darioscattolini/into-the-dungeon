// PLAYER
import { Player } from './player/player';

export { Player };

// HERO
import { Hero } from './hero/hero';
import { Bard } from './hero/heroes/bard';
import { Mage } from './hero/heroes/mage';
import { Ninja } from './hero/heroes/ninja';
import { Princess } from './hero/heroes/princess';

export { Hero, Bard, Mage, Ninja, Princess };

// MONSTER
import { Monster } from './monster/monster';
import { CommonMonsterType } from './monster/common-monster-type';
import { RareMonsterType } from './monster/rare-monster-type';
import { IDerivedMonsterStatic } from './monster/derived-monster-static.interface';
import { Goblin } from './monster/monsters/goblin';
import { Skeleton } from './monster/monsters/skeleton';
import { Orc } from './monster/monsters/orc';
import { Vampire } from './monster/monsters/vampire';
import { Golem } from './monster/monsters/golem';
import { Litch } from './monster/monsters/litch';
import { Demon } from './monster/monsters/demon';
import { Dragon } from './monster/monsters/dragon';
import { Fairy } from './monster/monsters/fairy';
import { Ally } from './monster/monsters/ally';
import { Mimic } from './monster/monsters/mimic';
import { JellyCube } from './monster/monsters/jelly-cube';
import { Dracula } from './monster/monsters/dracula';
import { Metamorph } from './monster/monsters/metamorph';

const CommonMonsterClasses: IDerivedMonsterStatic[] = [
  Goblin, Skeleton, Orc, Vampire, Golem, Litch, Demon, Dragon
];

const RareMonsterClasses: IDerivedMonsterStatic[] = [
  Fairy, Ally, Mimic, JellyCube, Dracula, Metamorph
];

export { 
  Monster, 
  CommonMonsterType, 
  RareMonsterType, 
  CommonMonsterClasses, 
  RareMonsterClasses 
};

// COMPANION
import { CompanionType } from './companion/companion-type';

export { CompanionType };

// MESSAGE
import { ICombatResult } from './message/icombat-result';
import { 
  IMonsterEffect, 
  IDamageEffect, 
  IAddCompanionEffect, 
  ILoseEquipmentEffect,
  ITransformationEffect,
  TransformerFunction
} from './message/imonster-effect';
import { ICompanionEffect } from './message/icompanion-effect';

export { 
  ICombatResult, 
  IMonsterEffect, 
  IDamageEffect, 
  IAddCompanionEffect, 
  ILoseEquipmentEffect,
  ITransformationEffect,
  TransformerFunction,
  ICompanionEffect
};
