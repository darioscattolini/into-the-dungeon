import { Hero } from './hero';

class ConcreteHero extends Hero { }

describe('Hero', () => {
  let hero: ConcreteHero;

  beforeEach(() => {
    hero = new ConcreteHero();
  });

  describe('constructor', () => {
    it('should help create an instance of an extension', () => {
      expect(hero).toBeTruthy();
    });

    it('should create an instance of Monster', () => {
      expect(hero instanceof Hero).toStrictEqual(true);
    });
  });
});
