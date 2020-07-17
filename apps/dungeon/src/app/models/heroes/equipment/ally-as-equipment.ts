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
      this.discardAfterUseOrOmission();
    }
    return monster.positionInDungeon === this.positionInDungeon + 1;
  }

  public useAgainst(monster: Monster) {
    if (!this.canBeUsedAgainst(monster)) {
      throw new Error('The ally can only be used against the monster after it');
    }
    this.discardAfterUseOrOmission();
    return { defeat: true };
  }

  private discardAfterUseOrOmission() {
    this._available = false;
  }
}
