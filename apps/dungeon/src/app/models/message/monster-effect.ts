import { CompanionType, Monster } from '../models';

export interface DamageEffect {
  type: 'damage';
  amount: number;
}

export interface AddCompanionEffect {
  type: 'companion';
  companion: CompanionType;
}

export interface LoseEquipmentEffect {
  type: 'equipment';
  lose: 'any';
}

export type TransformerFunction = (parameter: number) => Monster;

export interface TransformationEffect {
  type: 'transformation';
  parameter: 'equipmentSize' | 'playersVictories' | 'positionInDungeon';
  transformer: TransformerFunction;
}

export type MonsterEffect = 
  DamageEffect | 
  AddCompanionEffect | 
  LoseEquipmentEffect | 
  TransformationEffect;
