import { HeroInterface } from '../hero-interface';

type HeroConditionModifier = (hero: HeroInterface) => void;

export interface IEffect {
  defeat?: boolean;
  heroCondition?: HeroConditionModifier;
}

export interface IDefeatEffect extends IEffect {
  defeat: true;
}
