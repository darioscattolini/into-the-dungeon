import { Subject } from 'rxjs';
import { Monster } from '../models';
import { Hero, CombatResult } from '../models';

export interface Equipment {
  name: string;
  type: 'Weapon' | 'HitPoints' | 'DamageReducer' | 'Reviver';
  // hero: Hero;
  available: boolean; // discarded or not
  compulsory?: boolean; // must be used
  unconfigured?: boolean; // before Dungeon
  appliesThisRound(opponent?: Monster): boolean;
  apply(opponent?: Monster): Function[];
  discard(): void;
  subscribeToCombatResult?(combatResult$: Subject<CombatResult>): void;
  // unsuscribeToCombatResult?(): void; private, after discard
}

export interface Weapon extends Equipment {
  type: 'Weapon';
  appliesThisRound(opponent: Monster): boolean;
  apply(opponent: Monster): Function[];
}
