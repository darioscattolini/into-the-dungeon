import { Monster } from './monster';
import { Hero, Equipment } from '../heroes/hero';
import { ConcreteMonsterStatic } from './concrete-monster-static';
import { CommonMonster } from './common-monster';
import { RareMonster } from './rare-monster';

const MockOrc: ConcreteMonsterStatic = class extends Monster {
  public static readonly type: CommonMonster = 'Orc';
  public static readonly maxAmount: 1 | 2 = 2;
  public static readonly baseDamage = 3;
  constructor(opponent: Hero) {
    super(opponent);
  }
};

const MockDemon: ConcreteMonsterStatic = class extends Monster {
  public static readonly type: CommonMonster = 'Demon';
  public static readonly maxAmount: 1 | 2 = 1;
  public static readonly baseDamage = 7;
  constructor(opponent: Hero) {
    super(opponent);
  }
};

const NullDamageMonster: ConcreteMonsterStatic = class extends Monster {
  public static type: RareMonster = 'Ally';
  public static readonly maxAmount: 1 | 2 = 1;
  public static readonly baseDamage = null;
  constructor(opponent: Hero) {
    super(opponent);
  }
};

function buildMonsterPack(opponent: Hero): Monster[] {
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
  let opponent: Hero;

  beforeEach(() => {
    opponent = new class extends Hero {
      constructor() { super([]); }
    };
  });

  afterEach(() => {
    Monster.clearUncoveredInstances();
  })

  describe('single monster tests', () => {
    let monster: Monster;

    beforeEach(() => {
      monster = new MockOrc(opponent);
    });

    it('should be created (as instance of MockOrc extension)', () => {
      expect(monster).toBeTruthy();
    });

    it('should be an instance of Monster', () => {
      expect(monster instanceof Monster).toBe(true);
    });

    it('should be of type Orc', () => {
      expect(monster.type).toBe('Orc');
    });

    it('should receive baseDamage of 3 from MockOrc extension', () => {
      expect(monster.baseDamage).toBe(3);
    });

    describe('actualDamage property', () => {
      it('should be defined', () => {
        expect(monster.actualDamage).toBeDefined();
      });

      it('should equal baseDamage by default', () => {
        expect(monster.actualDamage).toEqual(monster.baseDamage);
      });

      it('should be different to baseDamage if opponent has equipment with damage modifier', () => {
        const coolEquipment: Equipment = {
          name: 'coolPiece',
          damageModifier: true,
          // tslint:disable-next-line: no-shadowed-variable
          modifyDamage(monster: Monster) {
            if (monster.baseDamage !== null) {
              return monster.baseDamage - 2 < 0 ? 0 : monster.baseDamage - 2;
            } else {
              return monster.baseDamage;
            }
          }
        }
        const coolOpponent = new class extends Hero {
          constructor() {
            super([coolEquipment]);
          }
        };
        
        const fuckedUpMonster = new MockOrc(coolOpponent);
        expect(fuckedUpMonster.actualDamage).toEqual(1);
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
