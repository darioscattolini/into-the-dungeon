import { IEquipment, DamageModifier } from './equipment/equipment.interface';

export interface DamageModifiersMessage {
  first: DamageModifier[],
  second: DamageModifier[]
}

export interface HeroInterface {
  equipment: IEquipment[];
  getDamageModifiers(): DamageModifiersMessage;
}
