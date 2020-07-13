import { Monster } from './monster';
import { ConcreteMonsterStatic } from './concrete-monster-static';
import { CommonMonster } from './common-monster';
import { RareMonster } from './rare-monster';
import { HeroInterface } from '../heroes/hero-interface';

const MockOrc: ConcreteMonsterStatic = class extends Monster {
  public static readonly type: CommonMonster = 'Orc';
  public static readonly maxAmount: 1 | 2 = 2;
  public static readonly baseDamage = 3;
  constructor(opponent: HeroInterface) {
    super(opponent);
  }
};

const MockDemon: ConcreteMonsterStatic = class extends Monster {
  public static readonly type: CommonMonster = 'Demon';
  public static readonly maxAmount: 1 | 2 = 1;
  public static readonly baseDamage = 7;
  constructor(opponent: HeroInterface) {
    super(opponent);
  }
};

const NullDamageMonster: ConcreteMonsterStatic = class extends Monster {
  public static readonly type: RareMonster = 'Ally';
  public static readonly maxAmount: 1 | 2 = 1;
  public static readonly baseDamage = null;
  constructor(opponent: HeroInterface) {
    super(opponent);
  }
};

function buildMonsterPack(opponent: HeroInterface): Monster[] {
  const monsterPack: Monster[] = [];
  for (let i = 0; i < 5; i++) {
    monsterPack.push(
      i % 2 === 0 
      ? new MockOrc(opponent) 
      : new MockDemon(opponent)
    );
  }
  return monsterPack;
}

describe('Monster', () => {
  let opponent: HeroInterface;

  beforeEach(() => {
    opponent = {
      equipment: [],
      getDamageModifiers() {
        return {
          first: [ ],
          second: [ ]
        }
      }
    }
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  })

  describe('single monster tests', () => {
    let monster: Monster;

    beforeEach(() => {
      monster = new MockDemon(opponent);
    });

    it('should be created (as instance of MockDemon extension)', () => {
      expect(monster).toBeTruthy();
    });

    it('should be an instance of Monster', () => {
      expect(monster instanceof Monster).toBe(true);
    });

    it('should be of type Demon', () => {
      expect(monster.type).toBe('Demon');
    });

    it('should receive baseDamage of 7 from MockDemon extension', () => {
      expect(monster.baseDamage).toBe(7);
    });

    describe('actualDamage property', () => {
      it('should be defined', () => {
        expect(monster.actualDamage).toBeDefined();
      });

      it('should equal baseDamage by default', () => {
        expect(monster.actualDamage).toEqual(monster.baseDamage);
      });

      it('should be 5 if opponent has equipment with -2 damage modifier', () => {
        opponent.getDamageModifiers = function() {
          return {
            first: [ ],
            second: [ (baseDamage: number) => baseDamage - 2 < 0 ? 0 : baseDamage - 2 ]
          }
        }
        monster = new MockDemon(opponent);
        expect(monster.actualDamage).toEqual(5);
      });

      it('should be 0 if opponent has reducer to 1 or 2 + -2 damage modifier, in that order', () => {
        opponent.getDamageModifiers = function() {
          return {
            first: [ (baseDamage: number) => baseDamage % 2 === 1 ? 1 : 2 ],
            second: [ (baseDamage: number) => baseDamage - 2 < 0 ? 0 : baseDamage - 2 ]
          }
        }
        monster = new MockDemon(opponent);
        expect(monster.actualDamage).toEqual(0);
      });

      it('should be 1 if opponent has reducer to 1 or 2 + -2 damage modifier, in reverse order', () => {
        opponent.getDamageModifiers = function() {
          return {
            first: [ (baseDamage: number) => baseDamage - 2 < 0 ? 0 : baseDamage - 2 ],
            second: [ (baseDamage: number) => baseDamage % 2 === 1 ? 1 : 2 ]
          }
        }
        monster = new MockDemon(opponent);
        expect(monster.actualDamage).toEqual(1);
      });
    });

    it('should allow monsters with null baseDamage', () => {
      const nullDamageMonster = new NullDamageMonster(opponent);
      expect(nullDamageMonster.baseDamage).toStrictEqual(null);
    });

    it('should register a Hero as monster opponent', () => {
      expect(monster.opponent).toStrictEqual(opponent);
    });
  });

  describe('many monsters tests', () => {
    let monsterPack: Monster[];
    let monsterType1_1: Monster,
        monsterType2_1: Monster,
        monsterType1_2: Monster,
        monsterType2_2: Monster,
        monsterType1_3: Monster;

    beforeEach(() => {
      monsterPack = buildMonsterPack(opponent);
      [
        monsterType1_1,
        monsterType2_1,
        monsterType1_2,
        monsterType2_2,
        monsterType1_3
      ] = monsterPack;
    });

    it('(they) should be registered in static property uncoveredInstances', () => {
      expect(Monster.uncoveredInstances).toEqual(monsterPack);
    });

    describe('clearUncoveredInstances method', () => {
      it('should empty Monster.uncoveredInstances array', () => {
        expect(Monster.uncoveredInstances.length).toBe(monsterPack.length);
        Monster.clearUncoveredInstances();
        expect(Monster.uncoveredInstances.length).toBe(0);
      });
    });

    it('(their) position in dungeon should be registered in positionInDungeon property', () => {
      expect(monsterType1_1.positionInDungeon).toBe(1);
      expect(monsterType2_1.positionInDungeon).toBe(2);
      expect(monsterType1_2.positionInDungeon).toBe(3);
      expect(monsterType2_2.positionInDungeon).toBe(4);
      expect(monsterType1_3.positionInDungeon).toBe(5);
    });

    it('(they) should store the nth instance of its type they represent in nthOfItsType property', () => {
      expect(monsterType1_1.nthOfItsType).toBe(1);
      expect(monsterType2_1.nthOfItsType).toBe(1);
      expect(monsterType1_2.nthOfItsType).toBe(2);
      expect(monsterType2_2.nthOfItsType).toBe(2);
      expect(monsterType1_3.nthOfItsType).toBe(3);
    });
  });
});
