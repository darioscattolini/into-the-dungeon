import { HeroType } from '../../models';

export interface IHero {
  name: HeroType;
  image: string;
  description: string;
  features: object;
}
