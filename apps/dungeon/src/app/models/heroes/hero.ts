import { EquipmentInterface } from './equipment/equipment-interface';

export abstract class Hero {
  
  constructor(public equipment: EquipmentInterface[]) { }

}
