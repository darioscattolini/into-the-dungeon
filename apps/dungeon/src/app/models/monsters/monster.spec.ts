import { Monster } from './monster';
import { Hero, Equipment } from '../heroes/hero';

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
    let monster: ConcreteMonsterType1;

    beforeEach(() => {
      monster = new ConcreteMonsterType1(opponent);
    });

    it('should be created (as instance of an extension)', () => {
      expect(monster).toBeTruthy();
    });

    it('should be an instance of Monster', () => {
      expect(monster instanceof Monster).toStrictEqual(true);
    });

    it('should receive name "Scary" from extension constructor', () => {
      expect(monster.name).toStrictEqual('Scary');
    });

    it('should receive baseDamage of 2 from extension constructor', () => {
      expect(monster.baseDamage).toStrictEqual(2);
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
        
        const fuckedUpMonster = new ConcreteMonsterType1(coolOpponent);
        expect(fuckedUpMonster.actualDamage).toEqual(0);
      });
    });

    it('should allow monsters with null baseDamage', () => {
      const nullDamageMonster = new class extends Monster {
        constructor() {
          super('NullDamage', null, opponent);
        }
      }
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
