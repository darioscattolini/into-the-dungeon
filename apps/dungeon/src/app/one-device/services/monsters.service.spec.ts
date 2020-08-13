import { TestBed } from '@angular/core/testing';

import { MonstersService } from './monsters.service';
import { 
  Monster, CommonMonsterClasses, RareMonsterClasses,
  Goblin, Skeleton, Orc, Vampire, Golem, Litch, Demon, Dragon,
  Fairy, Ally, Mimic, JellyCube, Dracula, Metamorph, MonsterViewMap, CommonMonsterType, RareMonsterType
 } from '../../models/models';

const rareMonstersFilter = (monster: Monster): boolean => {
  return (
    monster instanceof Fairy ||
    monster instanceof Ally ||
    monster instanceof Mimic ||
    monster instanceof JellyCube ||
    monster instanceof Dracula ||
    monster instanceof Metamorph
  );
};

describe('rareMonstersFilter', () => {
  let monsters: Monster[];
  let commonMonsters: Monster[];
  let rareMonsters: Monster[];

  beforeEach(() => {
    commonMonsters = CommonMonsterClasses.map(Class => new Class());

    rareMonsters = RareMonsterClasses.map(Class => new Class());

    monsters = [...commonMonsters, ...rareMonsters];
  });

  test('it filters rare monsters', () => {
    const filteredMonsters = monsters.filter(rareMonstersFilter);

    expect(filteredMonsters).toEqual(expect.toIncludeSameMembers(rareMonsters));
  });
});

describe('MonstersService', () => {
  let service: MonstersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonstersService]
    });
    service = TestBed.inject(MonstersService);
  });

  test('it is created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMonstersPack', () => {
    let monstersPack: Monster[];
    
    beforeEach(() => {
      monstersPack = service.getMonstersPack();
    });

    test('it returns 15 members', () => {
      expect(monstersPack).toHaveLength(15);
    });

    test('it contains Monsters', () => {
      expect(monstersPack).toSatisfyAll(monster => monster instanceof Monster);
    });

    test('it contains 2 instances of Goblin', () => {
      const goblins = monstersPack
        .filter(monster => monster instanceof Goblin);
      
      expect(goblins).toHaveLength(2);
    });

    test('it contains 2 instances of Skeleton', () => {
      const skeletons = monstersPack
        .filter(monster => monster instanceof Skeleton);

      expect(skeletons).toHaveLength(2);
    });

    test('it contains 2 instances of Orc', () => {
      const orcs = monstersPack.filter(monster => monster instanceof Orc);

      expect(orcs).toHaveLength(2);
    });

    test('it contains 2 instances of Vampire', () => {
      const vampires = monstersPack
        .filter(monster => monster instanceof Vampire);

      expect(vampires).toHaveLength(2);
    });

    test('it contains 2 instances of Golem', () => {
      const golems = monstersPack.filter(monster => monster instanceof Golem);

      expect(golems).toHaveLength(2);
    });

    test('it contains 1 instance of Litch', () => {
      const litches = monstersPack.filter(monster => monster instanceof Litch);

      expect(litches).toHaveLength(1);
    });

    test('it contains 1 instance of Demon', () => {
      const demons = monstersPack.filter(monster => monster instanceof Demon);

      expect(demons).toHaveLength(1);
    });

    test('it contains 1 instance of Dragon', () => {
      const dragons = monstersPack.filter(monster => monster instanceof Dragon);

      expect(dragons).toHaveLength(1);
    });

    test('it contains 2 instances of rare monsters', () => {
      const rareMonsters = monstersPack.filter(rareMonstersFilter);

      expect(rareMonsters).toHaveLength(2);
    });

    test('it contains 2 instances of rare monsters of different kind', () => {
      const rareMonsters = monstersPack.filter(rareMonstersFilter);

      expect(rareMonsters[0].type).not.toEqual(rareMonsters[1].type);
    });

    test('it contains 2 random types of rare monsters', () => {
      const rareCouples: string[] = [];
      
      for (let i = 0; i < 10; i++) {
        const couple = service.getMonstersPack()
          .filter(rareMonstersFilter)
          .map(monster => monster.type)
          .sort()
          .toString();
        rareCouples.push(couple);
      }

      const changes = rareCouples.reduce(
        (count, current, index, array) => {
          if (current !== array[index - 1]) count++;
          return count;
        }, 0
      );

      expect(changes).toBeGreaterThan(5);
    });

    test('it eventually outputs all rare monster types', () => {
      const condition = {
        expecting: RareMonsterClasses.slice(0),
        ready() {
          return this.expecting.length === 0;
        },
        update(monsters: Monster[]) {
          for (const monster of monsters) {
            if (this.expecting.find(Type => monster instanceof Type)) {
              const index = 
                this.expecting.findIndex(Type => monster instanceof Type);
              this.expecting.splice(index, 1);
            }
          }
        }
      };
      
      while (!condition.ready()) {
        const rareMonsters = service.getMonstersPack()
          .filter(rareMonstersFilter);
        condition.update(rareMonsters);
      }

      expect(condition.ready()).toBe(true);
    });

    test('it is randomly ordered', () => {
      const packs: string[][] = [];
      for (let i = 0; i < 100; i++) {
        const currentPack = 
          service.getMonstersPack().map(monster => monster.type);
        packs.push(currentPack);
      }

      const variations: number[] = [];
      for (let position = 0; position < packs[0].length; position++) {
        const unrepeatedTypes: string[] = [];
        for (let pack = 0; pack < packs.length; pack++) {
          if (!unrepeatedTypes.includes(packs[pack][position])) {
            unrepeatedTypes.push(packs[pack][position]);
          }
        }
        variations.push(unrepeatedTypes.length);
      }
      
      expect(variations).toSatisfyAll(number => number >= 9);
    });
  });

  describe('getViewDataFor', () => {
    const DataMap = MonsterViewMap;
    const monsterTypes: (CommonMonsterType | RareMonsterType)[][] = [
      ['goblin'], ['skeleton'], ['orc'], ['vampire'], ['golem'], ['litch'], 
      ['demon'], ['dragon'], ['ally'], ['fairy'], ['mimic'], ['jelly cube'], 
      ['dracula'], ['metamorph']
    ];

    test.each(monsterTypes)(
      'it returns view data for each monster type', 
      (monsterType) => {
        const expectedData = MonsterViewMap[monsterType];

        expect(service.getViewDataFor(monsterType)).toEqual(expectedData);
      }
    );
  });
});
