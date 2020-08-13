import { Equipment } from '../models';

export abstract class Hero {

  public get equipment() { return this._equipment.slice(); }
  public get equipmentSize() { return this.equipment.length; }
  protected abstract _equipment: Equipment[];

  constructor() { }

  public discardEquipment(piece: Equipment) {

  }
}
