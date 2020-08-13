import { Equipment } from '../models';

export abstract class Hero {

  public get equipment() { return this._equipment.slice(); }
  protected abstract _equipment: Equipment[];

  constructor() { }

  public get equipmentSize(): number {
    return this.equipment.length;
  }

  public discardEquipment(piece: Equipment) {

  }

}
