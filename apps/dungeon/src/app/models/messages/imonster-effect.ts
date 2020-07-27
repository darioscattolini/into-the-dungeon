import { CompanionType, Monster, Hero } from '../models';

export interface IDamageEffect {
  type: 'damage';
  amount: number;
}

export interface IAddCompanionEffect {
  type: 'companion';
  companion: CompanionType;
}

export interface ILoseEquipmentEffect {
  type: 'equipment';
  lose: 'any';
}

export type TransformerFunction = ( () => Monster ) | ( (hero: Hero) => Monster );

export interface ITransformationEffect {
  type: 'transformation';
  parameter: 'hero' | 'none';
  transformer: TransformerFunction;
}

export type IMonsterEffect = IDamageEffect | 
  IAddCompanionEffect | 
  ILoseEquipmentEffect | 
  ITransformationEffect;
