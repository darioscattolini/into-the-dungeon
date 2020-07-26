import { CommonMonster } from '../common-monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { staticImplements } from '../../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Golem extends CommonMonster {
  public static readonly maxAmount = 2;

  constructor() {
    super('Golem', 5);
  }
};
