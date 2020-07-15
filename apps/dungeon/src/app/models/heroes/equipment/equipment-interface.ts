import { Monster } from '../../monsters/monster';

interface BaseEquipment {
  name: string;
  available: boolean; // discarded or not
  modifiesDamage: boolean;
  canBeUsedAgainst? (monster: Monster): boolean;
  useAgainst? (monster: Monster): void;
}

export type DamageModifier = (baseDamage: number) => number;

interface EquipmentWithDamageModifier extends BaseEquipment {
  modifiesDamage: true;
  order: 'first' | 'second';
  damageModifier: DamageModifier;
}

interface EquipmentWithoutDamageModifier extends BaseEquipment {
  modifiesDamage: false;
}

export type EquipmentInterface = EquipmentWithDamageModifier | EquipmentWithoutDamageModifier;
