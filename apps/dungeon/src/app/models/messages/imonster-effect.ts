import { CompanionType, Player, Monster } from '../models';

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

type TransformerFunction = (player?: Player) => Monster;

export interface ITransformationEffect {
  type: 'transformation';
  parameter: 'player' | 'none';
  transformation: TransformerFunction;
}

export type IMonsterEffect = IDamageEffect | 
  IAddCompanionEffect | 
  ILoseEquipmentEffect | 
  ITransformationEffect;
