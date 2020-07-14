import { Monster } from './monster';
import { HeroInterface } from '../heroes/hero-interface';

export class Troll extends Monster {
  constructor(opponent: HeroInterface) {
    super(opponent);
  }
}
