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

export type TransformerFunction = (parameter: number) => Monster;

export interface ITransformationEffect {
  type: 'transformation';
  parameter: 'equipmentSize' | 'playersVictories' | 'positionInDungeon';
  transformer: TransformerFunction;
}

export type IMonsterEffect = IDamageEffect | 
  IAddCompanionEffect | 
  ILoseEquipmentEffect | 
  ITransformationEffect;
