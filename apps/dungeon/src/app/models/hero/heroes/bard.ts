import { Hero } from '../hero';
import { DerivedHeroStatic } from '../derived-hero-static';
import { staticImplements } from '../../../utilities';

@staticImplements<DerivedHeroStatic>()
export class Bard extends Hero {
  protected _equipment = [];
}
