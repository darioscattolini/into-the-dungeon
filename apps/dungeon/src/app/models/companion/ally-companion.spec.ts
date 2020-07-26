import { AllyCompanion } from './ally-companion';
import { Monster } from '../models';
import { CommonMonsterType } from '../models';
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

describe('AllyCompanion', () => {
  let ally: AllyCompanion;
  let targetsPosition: number;
  let combatResult$: Subject<ICombatResult>

  beforeEach(() => {
    targetsPosition = 2;
    combatResult$ = new Subject<ICombatResult>();
    ally = new AllyCompanion(targetsPosition, combatResult$);
  });
  
  it('should create an instance', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance of AllyCompanion', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance with type "Ally"', () => {
    expect(ally.type).toBe('Ally');
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

  it('should produce a monsterDefeated effect when used', () => {
    expect(ally.produceEffect()).toEqual({ monsterDefeated: true });
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
});
