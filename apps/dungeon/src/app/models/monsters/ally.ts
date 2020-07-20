import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { HeroInterface } from '../heroes/hero-interface';
import { staticImplements } from '../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Ally extends Monster {
  public static readonly maxAmount = 1;

  constructor(opponent: HeroInterface) {
    super('Ally', null, opponent);
  }
};
