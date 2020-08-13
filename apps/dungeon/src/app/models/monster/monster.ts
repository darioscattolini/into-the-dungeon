import { CommonMonsterType } from './common-monster-type';
import { RareMonsterType } from './rare-monster-type';
import { MonsterEffect } from '../models';

export abstract class Monster {
  protected abstract _type: CommonMonsterType | RareMonsterType;
  protected abstract _baseDamage: number | null;
  
  protected _positionInDungeon: number | undefined;

  public abstract get type(): CommonMonsterType | RareMonsterType;

  public abstract get baseDamage(): number | null;

  public abstract produceEffect(): MonsterEffect;

  public abstract startingAction(): MonsterEffect | null;

  public get positionInDungeon() {
    return this._positionInDungeon
  }

  public addToDungeonInPosition(position: number) {
    this._positionInDungeon = position;
  }
}
