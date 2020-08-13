import { CompanionType } from './companion-type';
import { Monster, CompanionEffect } from '../models';

export interface Companion {
  type: CompanionType;
  available: boolean;
  appliesThisRound(monster: Monster): boolean;
  produceEffect(): CompanionEffect;
}
