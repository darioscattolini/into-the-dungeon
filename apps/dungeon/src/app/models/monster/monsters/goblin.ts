import { CommonMonster } from '../common-monster';
import { DerivedMonsterStatic } from '../derived-monster-static';
import { staticImplements } from '../../../utilities';

@staticImplements<DerivedMonsterStatic>()
export class Goblin extends CommonMonster {
  public static readonly maxAmount = 2;

  constructor() {
    super('goblin', 1);
  }
};
