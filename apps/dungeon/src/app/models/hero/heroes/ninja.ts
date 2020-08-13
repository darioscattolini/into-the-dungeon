import { Hero } from '../hero';
import { staticImplements } from '../../../utilities';
import { DerivedHeroStatic } from '../derived-hero-static';

@staticImplements<DerivedHeroStatic>()
export class Ninja extends Hero {
  protected _equipment = [];
}
