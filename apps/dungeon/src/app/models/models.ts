// PLAYER
import { Player } from './player/player';

export { Player };

// HERO
import { Hero } from './hero/hero';
import { IDerivedHeroStatic } from './hero/derived-hero-static.interface';
import { HeroType } from './hero/hero.type';
import { Bard } from './hero/heroes/bard';
import { Mage } from './hero/heroes/mage';
import { Ninja } from './hero/heroes/ninja';
import { Princess } from './hero/heroes/princess';

export { Hero, IDerivedHeroStatic, HeroType, Bard, Mage, Ninja, Princess };

// EQUIPMENT
import { IEquipment } from './equipment/equipment.interface';

export { IEquipment };

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

const CommonMonsterClasses: ReadonlyArray<IDerivedMonsterStatic> = [
  Goblin, Skeleton, Orc, Vampire, Golem, Litch, Demon, Dragon
];

const RareMonsterClasses: ReadonlyArray<IDerivedMonsterStatic> = [
  Fairy, Ally, Mimic, JellyCube, Dracula, Metamorph
];

export { 
  Monster, 
  CommonMonsterType, RareMonsterType, 
  CommonMonsterClasses, RareMonsterClasses,
  Goblin, Skeleton, Orc, Vampire, Golem, Litch, Demon, Dragon,
  Fairy, Ally, Mimic, JellyCube, Dracula, Metamorph 
};

// COMPANION
import { CompanionType } from './companion/companion-type';

export { CompanionType };

// MESSAGE
import { IBiddingResult } from './message/ibidding-result';
import { ICombatResult } from './message/icombat-result';
import { IRaidResult } from './message/iraid-result';
import { IGameResult } from './message/igame-result';
import { 
  IMonsterEffect, 
  IDamageEffect, 
  IAddCompanionEffect, 
  ILoseEquipmentEffect,
  ITransformationEffect,
  TransformerFunction,
} from './message/imonster-effect';
import { ICompanionEffect } from './message/icompanion-effect';
import { IChoiceRequest, IChoiceResponse } from './message/ichoice';
import { IAcceptanceRequest, IAcceptanceResponse } from './message/iacceptance';

export { 
  IBiddingResult,
  ICombatResult,
  IRaidResult,
  IGameResult,
  IMonsterEffect, 
  IDamageEffect, 
  IAddCompanionEffect, 
  ILoseEquipmentEffect,
  ITransformationEffect,
  TransformerFunction,
  ICompanionEffect,
  IAcceptanceResponse,
  IAcceptanceRequest,
  IChoiceRequest,
  IChoiceResponse
};

// UI
import { IHero } from './ui/hero/ihero';
import { bard } from './ui/hero/bard';
import { mage } from './ui/hero/mage';
import { ninja } from './ui/hero/ninja';
import { princess } from './ui/hero/princess';
import { IBidOrWithdraw } from './ui/bidding/IBidOrWithdraw';
import { bid } from './ui/bidding/bid';
import { withdraw } from './ui/bidding/withdraw';

type HeroesOptions = {
  [key in HeroType]: IHero;
}

const heroes: Readonly<HeroesOptions> = Object.freeze({
  bard: bard,
  mage: mage,
  ninja: ninja,
  princess: princess
});

const bidOrWithdraw = Object.freeze({
  bid: bid,
  withdraw: withdraw
});

export { 
  IHero, heroes,
  IBidOrWithdraw, bidOrWithdraw
}
