import { Hero } from './hero';
import { stubEquipment } from '../../mocks/equipment.mocks';

class ConcreteHero extends Hero { 
  protected equipment = [
    stubEquipment
  ];
}

describe('Hero', () => {
  let hero: Hero;

  beforeEach(() => {
    hero = new ConcreteHero();
  });

  describe('Hero', () => {
    it('should be created as instance of Concrete extension', () => {
      expect(hero).toBeTruthy();
    });

    it('should be an instance of Hero', () => {
      expect(hero instanceof Hero).toStrictEqual(true);
    });

    it('should return its equipmentSize', () => {
      expect(hero.equipmentSize).toBeDefined();
    });
  });
});
