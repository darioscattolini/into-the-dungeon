import { Monster } from './monster';
import { Hero } from '../heroes/hero';

class ConcreteMonsterType1 extends Monster {
  constructor(opponent: Hero) {
    super('Scary', 2, opponent);
  }
}

class ConcreteMonsterType2 extends Monster {
  constructor(opponent: Hero) {
    super('Not So Scary', 0, opponent);
  }
}

function buildMonsterPack(opponent: Hero): Monster[] {
  const monsterPack: Monster[] = [];
  for (let i = 0; i < 5; i++) {
    monsterPack.push(
      i % 2 === 0 
      ? new ConcreteMonsterType1(opponent) 
      : new ConcreteMonsterType2(opponent)
    );
  }
  return monsterPack;
}

describe('Monster', () => {
  let monster: ConcreteMonsterType1;
  let opponent: Hero;

  beforeEach(() => {
    opponent = new class extends Hero {};
    monster = new ConcreteMonsterType1(opponent);
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
      const monsterPack = buildMonsterPack(opponent);
      expect(Monster.uncoveredInstances).toEqual(monsterPack);
    });

    it('should register the number of instances of its type in nthOfItsType property', () => {
      Monster.clearUncoveredInstances();
      const [
        monsterType1_1,
        monsterType2_1,
        monsterType1_2,
        monsterType2_2,
        monsterType1_3
      ] = buildMonsterPack(opponent);
      expect(monsterType1_1.nthOfItsType).toBe(1);
      expect(monsterType2_1.nthOfItsType).toBe(1);
      expect(monsterType1_2.nthOfItsType).toBe(2);
      expect(monsterType2_2.nthOfItsType).toBe(2);
      expect(monsterType1_3.nthOfItsType).toBe(3);
    });
  });

  describe('clearUncoveredInstances', () => {
    it('should empty Monster.uncoveredInstances array', () => {
      expect(Monster.uncoveredInstances.length).toBe(1);
      Monster.clearUncoveredInstances();
      expect(Monster.uncoveredInstances.length).toBe(0);
      const monsterPackAmount = buildMonsterPack(opponent).length;
      expect(Monster.uncoveredInstances.length).toBe(monsterPackAmount);
      Monster.clearUncoveredInstances();
      expect(Monster.uncoveredInstances.length).toBe(0);
    });
  });
});
