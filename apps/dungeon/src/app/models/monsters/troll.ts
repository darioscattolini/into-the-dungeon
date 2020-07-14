import { Monster } from './monster';
import { HeroInterface } from '../heroes/hero-interface';

export class Troll extends Monster {
  public static readonly type = 'Troll';
  public static readonly baseDamage = 1;
  public static readonly maxAmount = 2;

  constructor(opponent: HeroInterface) {
    super(opponent);
  }
}
