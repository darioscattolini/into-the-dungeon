import { Hero } from '../heroes/hero';
import { ConcreteMonsterStatic } from './concrete-monster-static';

export abstract class Monster {
  public static uncoveredInstances: Monster[] = []; // this field should be private (or perhaps protected)
  
  public actualDamage: number | null;
  public nthOfItsType: number;  // this field should be protected
  public positionInDungeon: number; // this field should be protected, just for metamorph

  constructor(
    public opponent: Hero   // this field should be protected
  ) {
    this.actualDamage = this.baseDamage;
    this.determineAttackModifiers();
    Monster.uncoveredInstances.push(this);
    this.nthOfItsType = Monster.uncoveredInstances.filter(
      monster => monster.constructor.name === this.constructor.name
    ).length;
    this.positionInDungeon = Monster.uncoveredInstances.length; //for metamorph
  }

  public static clearUncoveredInstances() {
    this.uncoveredInstances.splice(0);
  }

  public get type() {
    return (this.constructor as ConcreteMonsterStatic).type;
  }

  public get baseDamage() {
    return (this.constructor as ConcreteMonsterStatic).baseDamage;
  }

  private determineAttackModifiers(): void {
    for (const piece of this.opponent.equipment) {
      // tslint:disable-next-line: no-non-null-assertion
      if (piece.damageModifier) this.actualDamage = piece!.modifyDamage(this);
    }
  }
}
