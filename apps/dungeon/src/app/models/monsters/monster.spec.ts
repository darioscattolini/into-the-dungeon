import { Monster } from './monster';
import { Hero } from '../heroes/hero';

class ConcreteMonster extends Monster {
  constructor(opponent: Hero) {
    super('Scary', 2, opponent);
  }
}

describe('Monster', () => {
  let monster: ConcreteMonster;
  let opponent: Hero;

  beforeEach(() => {
    opponent = new class extends Hero {};
    monster = new ConcreteMonster(opponent);
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  })

  describe('constructor', () => {
    it('should help create an instance of an extension', () => {
      expect(monster).toBeTruthy();
    });

    it('should create an instance of Monster', () => {
      expect(monster instanceof Monster).toStrictEqual(true);
    });

    it('should create an instance named "Scary"', () => {
      expect(monster.name).toStrictEqual('Scary');
    });

    it('should create an instance with baseDamage of 2', () => {
      expect(monster.baseDamage).toStrictEqual(2);
    });

    it('should allow monsters with null baseDamage', () => {
      const nullDamageMonster = new class extends Monster {
        constructor() {
          super('NullDamage', null, opponent);
        }
      }
      expect(nullDamageMonster.baseDamage).toStrictEqual(null);
    });

    it('should register hero as monster opponent', () => {
      expect(monster.opponent).toStrictEqual(opponent);
    });

    it('should register each created monster in static property uncoveredInstances', () => {
      Monster.clearUncoveredInstances();
      const monster0 = new ConcreteMonster(opponent);
      const monster1 = new ConcreteMonster(opponent);
      const monster2 = new ConcreteMonster(opponent);
      expect(Monster.uncoveredInstances).toEqual([monster0, monster1, monster2]);
    });
  });
});
