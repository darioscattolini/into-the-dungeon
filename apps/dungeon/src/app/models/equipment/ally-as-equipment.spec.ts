import { AllyAsEquipment } from './ally-as-equipment';
import { Monster } from '../models';
import { CommonMonsterType } from '../monster/common-monster-type';
import { ICombatResult } from '../models';
import { Subject } from 'rxjs';

class MockMonster extends Monster {
  protected _type: CommonMonsterType = 'Orc';
  protected _baseDamage = 3;

  public get type() {
    return this._type;
  }

  public get baseDamage() {
    return this._baseDamage;
  }
}

describe('AllyAsEquipment', () => {
  let ally: AllyAsEquipment;
  let targetsPosition: number;
  let combatResult$: Subject<ICombatResult>

  beforeEach(() => {
    targetsPosition = 2;
    combatResult$ = new Subject<ICombatResult>();
    ally = new AllyAsEquipment(targetsPosition, combatResult$);
  });
  
  it('should create an instance', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance of AllyAsEquipment', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance with name "Ally"', () => {
    expect(ally.name).toBe('Ally');
  });

  it('should create an instance with type "Weapon"', () => {
    expect(ally.type).toBe('Weapon');
  });

  it('should create an instance with field available with value true', () => {
    expect(ally.available).toBe(true);
  });

  it('should not apply in round not corresponding to targetsPosition', () => {
    const monster = new MockMonster();
    monster.addToDungeonInPosition(targetsPosition - 1);
    expect(ally.appliesThisRound(monster)).toBe(false);
  });

  it('should apply in round corresponding to targetsPosition', () => {
    const monster = new MockMonster();
    monster.addToDungeonInPosition(targetsPosition);
    expect(ally.appliesThisRound(monster)).toBe(true);
  });

  it('should not be discarded in round when it appears', () => {
    const monster = new MockMonster();
    monster.addToDungeonInPosition(targetsPosition - 1);
    
    combatResult$.next({
      monster: monster,
      defeated: true
    });

    expect(ally.available).toBe(true);
  });

  it('should be discarded in round immediately after it', () => {
    const monster = new MockMonster();
    monster.addToDungeonInPosition(targetsPosition);
    
    combatResult$.next({
      monster: monster,
      defeated: true
    });

    expect(ally.available).toBe(false);
  });
/*  
  describe('apply', () => {
    it('should return a defeat effect', () => {
      const effect = { defeat: true };
      const monster1 = new class extends Monster {} ('Troll', 1, opponent);
      const monster2 = new class extends Monster {} ('Ally', null, opponent);
      const monster3 = new class extends Monster {} ('Troll', 1, opponent);
      expect(ally.useAgainst(monster3)).toEqual(effect);
    });

    it('should throw error if used against wrong monster', () => {
      const monster1 = new class extends Monster {} ('Troll', 1, opponent);
      const monster2 = new class extends Monster {} ('Ally', null, opponent);
      const monster3 = new class extends Monster {} ('Troll', 1, opponent);
      const monster4 = new class extends Monster {} ('Orc', 3, opponent);
      expect(() => { ally.useAgainst(monster1) })
        .toThrow('The ally can only be used against the monster after it');
      expect(() => { ally.useAgainst(monster2) })
        .toThrow('The ally can only be used against the monster after it');
      expect(() => { ally.useAgainst(monster4) })
        .toThrow('The ally can only be used against the monster after it');
    });
  
  });*/
});
