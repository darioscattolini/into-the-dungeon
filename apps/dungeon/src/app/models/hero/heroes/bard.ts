import { Hero } from '../hero';
import { IDerivedHeroStatic } from '../derived-hero-static.interface';
import { staticImplements } from '../../../utilities';

@staticImplements<IDerivedHeroStatic>()
export class Bard extends Hero {
  protected equipment = [];
}
