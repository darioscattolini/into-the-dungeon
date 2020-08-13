import { HeroType } from '../../models';

export interface HeroView {
  name: HeroType;
  image: string;
  description: string;
  features: object;
}
