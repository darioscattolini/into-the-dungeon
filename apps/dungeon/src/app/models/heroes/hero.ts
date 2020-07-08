import { Monster } from '../monsters/monster';

interface BaseEquipment {
  name: string;
  damageModifier: boolean;
}

interface EquipmentWithDamageModifier extends BaseEquipment{
  damageModifier: true;
  modifyDamage: (monster: Monster) => number | null;
}

interface EquipmentWithoutDamageModifier extends BaseEquipment {
  damageModifier: false;
}

export type Equipment = EquipmentWithDamageModifier | EquipmentWithoutDamageModifier;

export abstract class Hero {
  constructor(public equipment: Equipment[]) { }
}
