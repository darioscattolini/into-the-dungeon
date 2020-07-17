import { EquipmentWeapon } from './equipment-interface';
import { Monster } from '../../monsters/monster';

export class AllyAsEquipment {
  public readonly name = 'Ally';
  public readonly modifiesDamage = false;
  public available = true;
  private positionInDungeon: number;

  constructor(positionInDungeon: number) {
    this.positionInDungeon = positionInDungeon;
  }

  public canBeUsedAgainst(monster: Monster) {
    return monster.positionInDungeon === this.positionInDungeon + 1;
  }
}

// canBeUsedAgainst? (monster: Monster): boolean; if monster is of nth type. calls discard method conditionally in case it is not used in previous monster
// useAgainst? (monster: Monster): void; calls discard method after use