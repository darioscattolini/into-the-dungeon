import { IEquipment, DamageModifier } from './equipment/equipment.interface';

export interface IDamageModifiersMessage {
  first: DamageModifier[],
  second: DamageModifier[]
}

export interface IHero {
  equipment: IEquipment[];
  getDamageModifiers(): IDamageModifiersMessage;
}
