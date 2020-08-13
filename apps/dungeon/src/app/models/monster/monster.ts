import { CommonMonsterType } from './common-monster-type';
import { RareMonsterType } from './rare-monster-type';
import { MonsterEffect } from '../models';

export abstract class Monster {
  public abstract get type(): CommonMonsterType | RareMonsterType;
  protected abstract _type: CommonMonsterType | RareMonsterType;
  
  public abstract get baseDamage(): number | null;
  protected abstract _baseDamage: number | null;
  
  public get positionInDungeon() { return this._positionInDungeon; }
  protected _positionInDungeon: number | undefined;

  public abstract produceEffect(): MonsterEffect;

  public abstract startingAction(): MonsterEffect | null;

  public addToDungeonInPosition(position: number) {
    this._positionInDungeon = position;
  }
}
