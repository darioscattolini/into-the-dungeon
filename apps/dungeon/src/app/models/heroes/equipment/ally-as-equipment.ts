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
    if (monster.positionInDungeon > this.positionInDungeon + 1) {
      this.available = false;
    }
    return monster.positionInDungeon === this.positionInDungeon + 1;
  }
}

// useAgainst? (monster: Monster): void; calls discard method after use