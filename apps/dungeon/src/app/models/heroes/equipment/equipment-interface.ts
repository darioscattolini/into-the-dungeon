import { Monster } from '../../monsters/monster';

export type DamageModifier = (baseDamage: number) => number;

export interface EquipmentBase {
  name: string;
  available: boolean; // discarded or not
  modifiesDamage: boolean;
}

export interface EquipmentWeapon extends EquipmentBase {
  canBeUsedAgainst (monster: Monster): boolean;
  useAgainst (monster: Monster): void;
}

export interface EquipmentWithDamageModifier extends EquipmentBase {
  modifiesDamage: true;
  modifierOrder: 'first' | 'second';
  damageModifier: DamageModifier;
}

export type EquipmentWeaponWithDamageModifier = EquipmentWeapon & EquipmentWithDamageModifier;

export type EquipmentInterface = EquipmentWeapon | 
  EquipmentWithDamageModifier | 
  EquipmentWeaponWithDamageModifier;