import { CompanionType } from '../models';

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

export type IMonsterEffect = IDamageEffect | IAddCompanionEffect | ILoseEquipmentEffect;
