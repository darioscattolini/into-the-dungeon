import { Monster } from '../../monsters/monster';

interface BaseEquipment {
  name: string;
  modifiesDamage: boolean;
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
