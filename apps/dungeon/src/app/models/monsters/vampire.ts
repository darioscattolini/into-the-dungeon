import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { HeroInterface } from '../heroes/hero-interface';
import { staticImplements } from '../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Vampire extends Monster {
  public static readonly maxAmount = 2;

  constructor(opponent: HeroInterface) {
    super('Vampire', 4, opponent);
  }
};
