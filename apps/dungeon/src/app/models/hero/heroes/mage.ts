import { Hero } from '../hero';
import { staticImplements } from '../../../utilities';
import { IDerivedHeroStatic } from '../derived-hero-static.interface';

@staticImplements<IDerivedHeroStatic>()
export class Mage extends Hero {
  protected equipment = [];
}
