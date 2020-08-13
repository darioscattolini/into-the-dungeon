import { Subject, PartialObserver, Subscription } from 'rxjs';
import { Monster } from '../models';
import { CombatResult } from '../models';
import { CompanionEffect } from '../models';
import { ICompanion } from './companion.interface';

  // still not sure if it should be equipment
export class AllyCompanion implements ICompanion {
  public readonly type = 'Ally';
  
  private _available = true;
  private readonly targetPosition: number;
  private readonly combatResultObserver: PartialObserver<CombatResult>;
  private subscription: Subscription;

  constructor(targetPosition: number, combatResult$: Subject<CombatResult>) {
    this.targetPosition = targetPosition;
    this.combatResultObserver = this.getCombatResultObserver();
    this.subscription = combatResult$.subscribe(this.combatResultObserver);
  }

  public get available(): boolean {
    return this._available;
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

  private getCombatResultObserver(): PartialObserver<CombatResult> {
    return {
      next: (combatResult: CombatResult) => {
        if (combatResult.monster.positionInDungeon === this.targetPosition) {
          this.discard();
        }
      },
      error: (error: any) => {
        console.error('Combat result observer has thrown error: ' + error);
      }
    }
  }

  private unsuscribeToCombatResult() {
    this.subscription.unsubscribe();
  }
}
