import { Monster } from '../monster/monster';

export type DamageModifier = (baseDamage: number) => number;

export interface IEquipment {
  name: string;
  available: boolean; // discarded or not
  modifiesDamage: boolean;
  modifierOrder?: 'first' | 'second';
  damageModifier?: DamageModifier;
  canBeUsedAgainst? (monster: Monster): boolean;
  useAgainst? (monster: Monster): void;
}

export interface IBaseEquipment {
  name: string;
  available: boolean; // discarded or not
  modifiesDamage: boolean;
}

export interface IWeapon extends IBaseEquipment {
  canBeUsedAgainst (monster: Monster): boolean;
  useAgainst (monster: Monster): void;
}

export interface IEquipmentWithDamageModifier extends IBaseEquipment {
  modifiesDamage: true;
  modifierOrder: 'first' | 'second';
  damageModifier: DamageModifier;
}
