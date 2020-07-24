import { IEquipment } from '../equipment/equipment.interface';
import { DamageModifier } from '../equipment/equipment.interface';

interface IDamageModifierMessage {
  first: DamageModifier[],
  second: DamageModifier[]
}

export abstract class Hero {
  
  constructor(public equipment: IEquipment[]) { }

  getDamageModifiers(): IDamageModifierMessage {
    return {
      first: [],
      second: []
    }
  }
}
