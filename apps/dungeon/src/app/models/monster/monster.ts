import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { IHero } from '../hero/hero.interface';
import { CommonMonster } from './common-monster';
import { RareMonster } from './rare-monster';

export abstract class Monster {
  public static readonly uncoveredInstances: Monster[] = []; // this field should be private (or perhaps protected)
  
  public readonly type: CommonMonster | RareMonster;
  public readonly baseDamage: number | null;
  public readonly opponent: IHero;  // this field should be protected
  public readonly positionInDungeon: number; // this field should be protected, just for metamorph
  
  protected _actualDamage: number | null;
  
  private readonly nthOfItsType: number;  // this field should be protected
  private readonly AbstractClass: typeof Monster;
  private readonly ConcreteClass: IDerivedMonsterStatic;

  constructor(
    type: CommonMonster | RareMonster,
    baseDamage: number | null,
    opponent: IHero
  ) {
    this.AbstractClass = Monster;
    this.ConcreteClass = this.constructor as IDerivedMonsterStatic;
    this.type = type;
    this.baseDamage = baseDamage;
    this.opponent = opponent;
    this.nthOfItsType = this.calculateAmountOfInstances();
    if (this.nthOfItsType > this.maxAmount) {
      throw new Error(`There can't be more than ${this.maxAmount} ${this.type}.`);
    }
    this.AbstractClass.uncoveredInstances.push(this);
    this.positionInDungeon = Monster.uncoveredInstances.length; //for metamorph
    this._actualDamage = this.calculateActualDamage();
  }

  public static clearUncoveredInstances() {
    this.uncoveredInstances.splice(0);
  }

  public get actualDamage() {
    return this._actualDamage;
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
