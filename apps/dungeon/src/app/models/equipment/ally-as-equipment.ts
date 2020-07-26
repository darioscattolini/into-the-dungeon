import { Subject, PartialObserver, Subscription } from 'rxjs';
import { Monster } from '../models';
import { IWeapon } from './equipment.interface';
import { ICombatResult } from '../models';

  // still not sure if it should be equipment
export class AllyAsEquipment implements IWeapon {
  public readonly name = 'Ally';
  public readonly type = 'Weapon';
  
  private _available = true;
  private readonly targetPosition: number;
  private readonly combatResultObserver: PartialObserver<ICombatResult>;
  private subscription: Subscription;

  constructor(targetPosition: number, combatResult$: Subject<ICombatResult>) {
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

  public apply(monster: Monster) {
    return [
      () => { } // monster defeat
    ]
  }
  // should be private?
  public discard() {
    this.unsuscribeToCombatResult();
    this._available = false;
  }

  private getCombatResultObserver(): PartialObserver<ICombatResult> {  // VERIFY
    return {
      next: (combatResult: ICombatResult) => {
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
