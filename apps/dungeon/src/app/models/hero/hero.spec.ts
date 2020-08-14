import { Hero } from './hero';
import { equipmentStub } from '../../mocks/equipment.mocks';

class ConcreteHero extends Hero { 
  protected _equipment = [
    equipmentStub
  ];
}

describe('Hero', () => {
  let hero: Hero;

  beforeEach(() => {
    hero = new ConcreteHero();
  });

  describe('Hero', () => {
    test('that its extension creates instance', () => {
      expect(hero).toBeTruthy();
    });

    test('it is an instance of Hero', () => {
      expect(hero).toBeInstanceOf(Hero);
    });

    test('it has an equipmentSize', () => {
      expect(hero.equipmentSize).toBeDefined();
    });
  });
});
