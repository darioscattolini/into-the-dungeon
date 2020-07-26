import { CompanionType } from './companion-type';
import { Monster, ICompanionEffect } from '../models';

export interface ICompanion {
  type: CompanionType;
  available: boolean;
  appliesThisRound(monster: Monster): boolean;
  produceEffect(): ICompanionEffect;
}