import { CompanionType, Monster } from '../models';

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

export interface ITransformationEffect {
  type: 'transformation';
  parameter: 'equipmentSize' | 'playersVictories' | 'positionInDungeon';
  transformer: (parameter: number) => Monster;
}

export type IMonsterEffect = IDamageEffect | 
  IAddCompanionEffect | 
  ILoseEquipmentEffect | 
  ITransformationEffect;
