import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { 
  CommonMonsterClasses, RareMonsterClasses, Monster
} from '../../models/models';


@Injectable({
  providedIn: OneDeviceModule
})
export class MonstersService {

  private readonly CommonMonsters = CommonMonsterClasses;
  private readonly RareMonsters   = RareMonsterClasses;

  constructor() { }

  public getMonstersMace() {
    const mace: Monster[] = [];
    this.addCommonMonsters(mace);
    this.addRareMonsters(mace);
    this.shuffleMace(mace);
    return mace;
  }

  private addCommonMonsters(mace: Monster[]) {
    for (const MonsterClass of this.CommonMonsters) {
      const amount = MonsterClass.maxAmount;
      for (let i = 0; i < amount; i++) {
        const monster = new MonsterClass();
        mace.push(monster);
      }
    }
  }

  private addRareMonsters(mace: Monster[]) {
    const PickedClasses = this.pick2RandomRareMonsterClasses();
    for (const PickedClass of PickedClasses) {
      const monster = new PickedClass();
      mace.push(monster);
    }
  }

  private pick2RandomRareMonsterClasses() {
    const index1 = Math.floor(Math.random() * this.RareMonsters.length);
    
    let index2 = Math.floor(Math.random() * (this.RareMonsters.length - 1));
    index2 = index2 < index1 ? index2 : index2 + 1;
    
    return [this.RareMonsters[index1], this.RareMonsters[index2]];
  }

  private shuffleMace(mace: Monster[]) {
    for (let i = mace.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const stored = mace[randomIndex];
      mace[randomIndex] = mace[i];
      mace[i] = stored;
    }
  }
}
