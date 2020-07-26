import { CommonMonster } from '../common-monster';
import { IDerivedMonsterStatic } from '../derived-monster-static.interface';
import { staticImplements } from '../../../utilities';

@staticImplements<IDerivedMonsterStatic>()
export class Vampire extends CommonMonster {
  public static readonly maxAmount = 2;

  constructor() {
    super('Vampire', 4);
  }
};
