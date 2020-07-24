import { Monster } from './monster';
import { IDerivedMonsterStatic } from './derived-monster-static.interface';
import { Hero } from '../models';

const MockOrc: IDerivedMonsterStatic = class extends Monster {
  public static readonly maxAmount: 1 | 2 = 2;
  constructor(opponent: Hero) {
    super('Orc', 3, opponent);
  }
};

const MockDemon: IDerivedMonsterStatic = class extends Monster {
  public static readonly maxAmount: 1 | 2 = 1;
  constructor(opponent: Hero) {
    super('Demon', 7, opponent);
  }
};

const MockAlly: IDerivedMonsterStatic = class extends Monster {
  public static readonly maxAmount: 1 | 2 = 1;
  constructor(opponent: Hero) {
    super('Ally', null, opponent);
  }
};

function buildMonsterPack(opponent: Hero): Monster[] {
  return [
    new MockOrc(opponent),
    new MockDemon(opponent),
    new MockAlly(opponent),
    new MockOrc(opponent)
  ];
}

describe('Monster', () => {
  let opponent: Hero;

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

    it('should have baseDamage of 7', () => {
      expect(monster.baseDamage).toBe(7);
    });

    it('should allow monsters with null baseDamage', () => {
      const mockAlly = new MockAlly(opponent);
      expect(mockAlly.baseDamage).toBe(null);
    });

    it('should register a Hero as monster opponent', () => {
      expect(monster.opponent).toBe(opponent);
    });

    describe('actualDamage property', () => {
      it('should be defined', () => {
        expect(monster.actualDamage).toBeDefined();
      });

      it('should equal baseDamage by default', () => {
        expect(monster.actualDamage).toBe(monster.baseDamage);
      });

      it('should be 5 if opponent has equipment with -2 damage modifier', () => {
        Monster.clearUncoveredInstances();
        opponent.getDamageModifiers = function() {
          return {
            first: [ ],
            second: [ (baseDamage: number) => baseDamage - 2 < 0 ? 0 : baseDamage - 2 ]
          }
        }
        monster = new MockDemon(opponent);
        expect(monster.actualDamage).toBe(5);
      });

      it('should be 0 if opponent has reducer to 1 or 2 + -2 damage modifier, in that order', () => {
        Monster.clearUncoveredInstances();
        opponent.getDamageModifiers = function() {
          return {
            first: [ (baseDamage: number) => baseDamage % 2 === 1 ? 1 : 2 ],
            second: [ (baseDamage: number) => baseDamage - 2 < 0 ? 0 : baseDamage - 2 ]
          }
        }
        monster = new MockDemon(opponent);
        expect(monster.actualDamage).toBe(0);
      });

      it('should be 1 if opponent has reducer to 1 or 2 + -2 damage modifier, in reverse order', () => {
        Monster.clearUncoveredInstances();
        opponent.getDamageModifiers = function() {
          return {
            first: [ (baseDamage: number) => baseDamage - 2 < 0 ? 0 : baseDamage - 2 ],
            second: [ (baseDamage: number) => baseDamage % 2 === 1 ? 1 : 2 ]
          }
        }
        monster = new MockDemon(opponent);
        expect(monster.actualDamage).toBe(1);
      });
    });
  });

  describe('many monsters tests', () => {
    let monsterPack: Monster[];
    let mockOrc1: Monster,
        mockDemon: Monster,
        mockAlly: Monster,
        mockOrc2: Monster;

    beforeEach(() => {
      monsterPack = buildMonsterPack(opponent);
      [
        mockOrc1,
        mockDemon,
        mockAlly,
        mockOrc2
      ] = monsterPack;
    });

    it('(they) should be registered in static property uncoveredInstances', () => {
      expect(Monster.uncoveredInstances).toEqual(monsterPack);
    });

    describe('static Monster.clearUncoveredInstances method', () => {
      it('should empty Monster.uncoveredInstances array', () => {
        expect(Monster.uncoveredInstances.length).toBe(monsterPack.length);
        Monster.clearUncoveredInstances();
        expect(Monster.uncoveredInstances.length).toBe(0);
      });
    });

    it('(their) position in dungeon should be registered in positionInDungeon property', () => {
      expect(mockOrc1.positionInDungeon).toBe(1);
      expect(mockDemon.positionInDungeon).toBe(2);
      expect(mockAlly.positionInDungeon).toBe(3);
      expect(mockOrc2.positionInDungeon).toBe(4);
    });

    it('should not allow the nth monster of its type to be higher than class maxAmount', () => {
      expect(() => new MockOrc(opponent)).toThrow(
        'There can\'t be more than 2 Orc.'
      );
      expect(() => new MockDemon(opponent)).toThrow(
        'There can\'t be more than 1 Demon.'
      );
      expect(() => new MockAlly(opponent)).toThrow(
        'There can\'t be more than 1 Ally.'
      );
    });
  });
});
