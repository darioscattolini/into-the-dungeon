import { IEquipment } from '../equipment/equipment.interface';
import { IDamageModifiersMessage } from './damage-modifiers-message.interface';

export abstract class Hero {
  
  constructor(public equipment: IEquipment[]) { }

  getDamageModifiers(): IDamageModifiersMessage {
    return {
      first: [],
      second: []
    }
  }
}
