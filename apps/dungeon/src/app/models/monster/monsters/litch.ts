import { CommonMonster } from '../common-monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { staticImplements } from '../../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Litch extends CommonMonster {
  public static readonly maxAmount = 1;

  constructor() {
    super('Litch', 6);
  }
};
