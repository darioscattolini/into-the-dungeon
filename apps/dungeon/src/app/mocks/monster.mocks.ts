import { Monster, CommonMonsterType } from "../models/models";

export class MockMonster extends Monster {
  
  public get type() { return this._type; }
  protected _type: CommonMonsterType = 'orc';

  public get baseDamage() { return this._baseDamage; }
  protected _baseDamage = 3;
  
  public startingAction() {
    return null;
  }

  public produceEffect() {
    return {
      type: 'damage' as 'damage',
      amount: this._baseDamage
    }
  }
}

export const mockMonster = new MockMonster();
