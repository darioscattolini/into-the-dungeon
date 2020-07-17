import { Monster } from '../../monsters/monster';

export class AllyAsEquipment {
  public readonly name = 'Ally';
  public readonly modifiesDamage = false;
  private _available = true;
  private positionInDungeon: number;

  constructor(positionInDungeon: number) {
    this.positionInDungeon = positionInDungeon;
  }

  public get available() {
    return this._available;
  }

  public canBeUsedAgainst(monster: Monster) {
    if (monster.positionInDungeon > this.positionInDungeon + 1) {
      this._available = false;
    }
    return monster.positionInDungeon === this.positionInDungeon + 1;
  }
}

// useAgainst? (monster: Monster): void; calls discard method after use