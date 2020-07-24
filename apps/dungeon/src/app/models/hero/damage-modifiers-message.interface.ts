import { DamageModifier } from '../equipment/equipment.interface';

export interface IDamageModifiersMessage {
  first: DamageModifier[],
  second: DamageModifier[]
}
