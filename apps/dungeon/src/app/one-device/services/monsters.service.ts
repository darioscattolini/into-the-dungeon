import { Injectable } from '@angular/core';
import { OneDeviceModule } from '../one-device.module';
import { 
  Monster, CommonMonsterClasses, RareMonsterClasses, 
  CommonMonsterType, RareMonsterType,
  MonsterView, MonsterViewMap
} from '../../models/models';

@Injectable({
  providedIn: OneDeviceModule
})
export class MonstersService {

  private readonly CommonMonsters = CommonMonsterClasses;
  private readonly RareMonsters   = RareMonsterClasses;
  private readonly ViewMap        = MonsterViewMap;

  constructor() { }

  public getMonstersPack() {
    const pack: Monster[] = [];
    this.addCommonMonsters(pack);
    this.addRareMonsters(pack);
    this.shuffle(pack);
    return pack;
  }

  public getViewDataFor(
    monsterType: CommonMonsterType | RareMonsterType
  ): MonsterView {
    return this.ViewMap[monsterType];
  }

  private addCommonMonsters(pack: Monster[]) {
    for (const MonsterClass of this.CommonMonsters) {
      const amount = MonsterClass.maxAmount;
      for (let i = 0; i < amount; i++) {
        const monster = new MonsterClass();
        pack.push(monster);
      }
    }
  }

  private addRareMonsters(pack: Monster[]) {
    const PickedClasses = this.pick2RandomRareMonsterClasses();
    for (const PickedClass of PickedClasses) {
      const monster = new PickedClass();
      pack.push(monster);
    }
  }

  private pick2RandomRareMonsterClasses() {
    const index1 = Math.floor(Math.random() * this.RareMonsters.length);
    
    let index2 = Math.floor(Math.random() * (this.RareMonsters.length - 1));
    index2 = index2 < index1 ? index2 : index2 + 1;
    
    return [this.RareMonsters[index1], this.RareMonsters[index2]];
  }

  private shuffle(pack: Monster[]) {
    for (let i = pack.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      const stored = pack[randomIndex];
      pack[randomIndex] = pack[i];
      pack[i] = stored;
    }
  }
}
