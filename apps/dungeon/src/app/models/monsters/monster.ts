import { Hero } from '../heroes/hero';

export abstract class Monster {
  public static uncoveredInstances: Monster[] = []; // this field should be private (or perhaps protected)

  public actualDamage: number | null;
  public nthOfItsType: number;  // this field should be protected
  public positionInDungeon: number; // this field should be protected

  constructor(
    public name: string,
    public baseDamage: number | null,
    public opponent: Hero   // this field should be protected
  ) {
    this.actualDamage = baseDamage;
    Monster.uncoveredInstances.push(this);
    this.nthOfItsType = Monster.uncoveredInstances.filter(
      monster => monster.constructor.name === this.constructor.name
    ).length;
    this.positionInDungeon = Monster.uncoveredInstances.length;
  }

  public static clearUncoveredInstances() {
    this.uncoveredInstances.splice(0);
  }
}
