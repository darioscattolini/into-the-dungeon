import { Hero } from '../models';

type HeroConditionModifier = (hero: Hero) => void;

export interface IEffect {
  defeat?: boolean;
  heroCondition?: HeroConditionModifier;
}

export interface IDefeatEffect extends IEffect {
  defeat: true;
}
