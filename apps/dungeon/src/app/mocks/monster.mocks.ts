import { Monster, CommonMonsterType } from "../models/models";

export class MockMonster extends Monster {
  protected _type: CommonMonsterType = 'Orc';
  protected _baseDamage = 3;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }
  
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
