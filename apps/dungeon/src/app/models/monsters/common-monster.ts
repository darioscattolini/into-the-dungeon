import { Monster } from './monster';
import { Hero } from '../heroes/hero';

export abstract class CommonMonster extends Monster {
    constructor(
      name: string,
      baseDamage: number,
      opponent: Hero
    ) {
      super(name, baseDamage, opponent);
    }
}
