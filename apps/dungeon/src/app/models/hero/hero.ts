import { IEquipment } from '../equipment/equipment.interface';

export abstract class Hero {

  protected abstract equipment: IEquipment[];

  constructor() { }

  public get equipmentSize(): number {
    return this.equipment.length;
  }

}
