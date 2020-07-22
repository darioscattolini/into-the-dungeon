import { IHero } from '../hero.interface';

type HeroConditionModifier = (hero: IHero) => void;

export interface IEffect {
  defeat?: boolean;
  heroCondition?: HeroConditionModifier;
}

export interface IDefeatEffect extends IEffect {
  defeat: true;
}
