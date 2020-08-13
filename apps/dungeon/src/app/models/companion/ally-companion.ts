import { Subject, PartialObserver, Subscription } from 'rxjs';
import { Monster } from '../models';
import { CombatResult } from '../models';
import { CompanionEffect } from '../models';
import { Companion } from './companion';

  // still not sure if it should be equipment
export class AllyCompanion implements Companion {
  public readonly type = 'ally';
  
  public get available(): boolean { return this._available; }
  private _available = true;

  private readonly targetPosition: number;
  private readonly subscription:   Subscription;

  constructor(targetPosition: number, combatResult$: Subject<CombatResult>) {
    this.targetPosition = targetPosition;
    this.subscription = this.subscribeToCombatResult(combatResult$);
  }

  public appliesThisRound(monster: Monster): boolean {
    return this.targetPosition === monster.positionInDungeon;
  }
    // what happens with incorrect turns?
  public produceEffect(): CompanionEffect {
    return {
      monsterDefeated: true
    }
  }
  // should be private?
  public discard() {
    this.unsuscribeToCombatResult();
    this._available = false;
  }

  private subscribeToCombatResult(
    combatResult$: Subject<CombatResult>
  ): Subscription {
    const observer: PartialObserver<CombatResult> = {
      next: (combatResult: CombatResult) => {
        if (combatResult.monster.positionInDungeon === this.targetPosition) {
          this.discard();
        }
      },
      error: (error: any) => {
        console.error('Combat result observer has thrown error: ' + error);
      }
    };
    
    const subscription = combatResult$.subscribe(observer);

    return subscription;
  }

  private unsuscribeToCombatResult() {
    this.subscription.unsubscribe();
  }
}
