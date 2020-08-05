import { AllyCompanion } from './ally-companion';
import { ICombatResult } from '../models';
import { Subject } from 'rxjs';
import { MockMonster } from '../../mocks/monster.mocks';

describe('AllyCompanion', () => {
  let ally: AllyCompanion;
  let targetsPosition: number;
  let combatResult$: Subject<ICombatResult>

  beforeEach(() => {
    targetsPosition = 2;
    combatResult$ = new Subject<ICombatResult>();
    ally = new AllyCompanion(targetsPosition, combatResult$);
  });
  
  test('instance creation', () => {
    expect(ally).toBeTruthy();
  });

  test('it is AllyCompanion', () => {
    expect(ally).toBeInstanceOf(AllyCompanion);
  });

  test('it has type "ally"', () => {
    expect(ally.type).toEqualCaseInsensitive('ally');
  });

  test('it has available field with value true', () => {
    expect(ally.available).toBeTrue();
  });

  test('it does not apply in round different to targetsPosition', () => {
    const target = new MockMonster();
    target.addToDungeonInPosition(targetsPosition - 1);
    expect(ally.appliesThisRound(target)).toBeFalse();
  });

  test('it applies in round corresponding to targetsPosition', () => {
    const target = new MockMonster();
    target.addToDungeonInPosition(targetsPosition);
    expect(ally.appliesThisRound(target)).toBeTrue();
  });

  test('it produces a monsterDefeated effect when used', () => {
    expect(ally.produceEffect()).toEqual({ monsterDefeated: true });
  });

  test('it is not discarded in the round ally appears', () => {
    const allyMonster = new MockMonster();
    allyMonster.addToDungeonInPosition(targetsPosition - 1);
    
    combatResult$.next({
      monster: allyMonster,
      defeated: true
    });

    expect(ally.available).toBe(true);
  });

  test('it is discarded in the round against following monster', () => {
    const followingMonster = new MockMonster();
    followingMonster.addToDungeonInPosition(targetsPosition);
    
    combatResult$.next({
      monster: followingMonster,
      defeated: true
    });

    expect(ally.available).toBe(false);
  });
});
