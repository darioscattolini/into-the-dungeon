import { ConcreteMonsterStatic } from './concrete-monster-static';
import { HeroInterface } from '../heroes/hero-interface';

export abstract class Monster {
  public static readonly uncoveredInstances: Monster[] = []; // this field should be private (or perhaps protected)
  
  public readonly baseDamage: number | null;
  public actualDamage: number | null;
  public positionInDungeon: number; // this field should be protected, just for metamorph
  
  private nthOfItsType: number;  // this field should be protected
  private AbstractClass = Monster;
  private ConcreteClass = this.constructor as ConcreteMonsterStatic;

  constructor(
    baseDamage: number | null,
    public opponent: HeroInterface   // this field should be protected
  ) {
    this.baseDamage = baseDamage;
    this.nthOfItsType = this.calculateAmountOfInstances();
    if (this.nthOfItsType > this.maxAmount) {
      throw new Error(`There can't be more than ${this.maxAmount} ${this.type}.`);
    }
    this.AbstractClass.uncoveredInstances.push(this);
    this.positionInDungeon = Monster.uncoveredInstances.length; //for metamorph
    this.actualDamage = this.calculateActualDamage();
  }

  public static clearUncoveredInstances() {
    this.uncoveredInstances.splice(0);
  }

  public get type() {
    return this.ConcreteClass.type;
  }

  private get maxAmount() {
    return this.ConcreteClass.maxAmount;
  }

  private calculateAmountOfInstances(): number {
    const currentInstances = this.AbstractClass.uncoveredInstances.filter(
      monster => monster.type === this.type
    ).length;
    return currentInstances + 1;
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
