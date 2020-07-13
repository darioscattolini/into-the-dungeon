import { ConcreteMonsterStatic } from './concrete-monster-static';
import { HeroInterface } from '../heroes/hero-interface';

export abstract class Monster {
  public static readonly uncoveredInstances: Monster[] = []; // this field should be private (or perhaps protected)
  
  public actualDamage: number | null;
  public nthOfItsType: number;  // this field should be protected
  public positionInDungeon: number; // this field should be protected, just for metamorph

  constructor(
    public opponent: HeroInterface   // this field should be protected
  ) {
    this.actualDamage = this.calculateActualDamage();
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

  private calculateActualDamage(): number | null {
    let damage = this.baseDamage;
    if (damage !== null) {
      const damageModifiers = this.opponent.getDamageModifiers();
      for(const modifier of damageModifiers.first) {
        damage = modifier(damage);
      }
      for(const modifier of damageModifiers.second) {
        damage = modifier(damage);
      }
    }
    return damage;
  }
}
