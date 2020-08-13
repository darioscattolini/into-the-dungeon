import { Hero } from '../hero';
import { staticImplements } from '../../../utilities';
import { DerivedHeroStatic } from '../derived-hero-static';

@staticImplements<DerivedHeroStatic>()
export class Mage extends Hero {
  protected _equipment = [];
}
