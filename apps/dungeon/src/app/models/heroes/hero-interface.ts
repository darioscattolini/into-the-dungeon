import { EquipmentInterface, DamageModifier } from './equipment/equipment-interface';

export interface DamageModifiersMessage {
  first: DamageModifier[],
  second: DamageModifier[]
}

export interface HeroInterface {
  equipment: EquipmentInterface[];
  getDamageModifiers(): DamageModifiersMessage;
}
