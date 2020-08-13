import { CommonMonster } from '../common-monster';
import { DerivedMonsterStatic } from '../derived-monster-static';
import { staticImplements } from '../../../utilities';

@staticImplements<DerivedMonsterStatic>()
export class Demon extends CommonMonster {
  public static readonly maxAmount = 1;

  constructor() {
    super('demon', 7);
  }
};
