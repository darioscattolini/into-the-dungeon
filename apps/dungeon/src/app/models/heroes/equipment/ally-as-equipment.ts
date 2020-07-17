import { Monster } from '../../monsters/monster';
import { EquipmentWeapon } from './equipment-interface';
import { IDefeatEffect } from './effect.interface';

export class AllyAsEquipment implements EquipmentWeapon {
  public readonly name = 'Ally';
  public readonly modifiesDamage = false;
  private _available = true;
  private positionInDungeon: number;

  constructor(positionInDungeon: number) {
    this.positionInDungeon = positionInDungeon;
  }

  public get available(): boolean {
    return this._available;
  }

  public canBeUsedAgainst(monster: Monster): boolean {
    if (monster.positionInDungeon > this.positionInDungeon + 1) {
      this.discardAfterUseOrOmission();
    }
    return monster.positionInDungeon === this.positionInDungeon + 1;
  }

  public useAgainst(monster: Monster): IDefeatEffect {
    if (!this.canBeUsedAgainst(monster)) {
      throw new Error('The ally can only be used against the monster after it');
    }
    this.discardAfterUseOrOmission();
    return { defeat: true };
  }

  private discardAfterUseOrOmission(): void {
    this._available = false;
  }
}
