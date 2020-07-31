import { Hero } from '../models/models';
import { stubEquipment } from './equipment.mocks';

class NoEquipHero extends Hero {
  protected equipment = [];
}

class OneEquipHero extends Hero {
  protected equipment = [ stubEquipment ];
}

export const noEquipHeroStub: Hero = new NoEquipHero();
export const oneEquipHeroStub: Hero = new OneEquipHero();
