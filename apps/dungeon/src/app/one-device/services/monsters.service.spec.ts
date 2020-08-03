import { TestBed } from '@angular/core/testing';

import { MonstersService } from './monsters.service';
import { 
  Monster, 
  Goblin, Skeleton, Orc, Vampire, Golem, Litch, Demon, Dragon, 
  Fairy, Ally, Mimic, JellyCube, Dracula, Metamorph, RareMonsterClasses,
 } from '../../models/models';

const rareMonstersFilter = (monster: Monster) => {
  return (
    monster instanceof Fairy ||
    monster instanceof Ally ||
    monster instanceof Mimic ||
    monster instanceof JellyCube ||
    monster instanceof Dracula ||
    monster instanceof Metamorph
  );
};

describe('MonstersService', () => {
  let service: MonstersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonstersService]
    });
    service = TestBed.inject(MonstersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getMonstersPack return', () => {
    let monstersPack: Monster[];
    
    beforeEach(() => {
      monstersPack = service.getMonstersPack();
    });

    it('should contain 15 members', () => {
      expect(monstersPack).toHaveLength(15);
    });

    it('should contain monsters', () => {
      expect(monstersPack.every(monster => monster instanceof Monster))
        .toBe(true);
    });

    it('should contain 2 instances of Goblin', () => {
      expect(monstersPack.filter(monster => monster instanceof Goblin))
        .toHaveLength(2);
    });

    it('should contain 2 instances of Skeleton', () => {
      expect(monstersPack.filter(monster => monster instanceof Skeleton))
        .toHaveLength(2);
    });

    it('should contain 2 instances of Orc', () => {
      expect(monstersPack.filter(monster => monster instanceof Orc))
        .toHaveLength(2);
    });

    it('should contain 2 instances of Vampire', () => {
      expect(monstersPack.filter(monster => monster instanceof Vampire))
        .toHaveLength(2);
    });

    it('should contain 2 instances of Golem', () => {
      expect(monstersPack.filter(monster => monster instanceof Golem))
        .toHaveLength(2);
    });

    it('should contain 1 instance of Litch', () => {
      expect(monstersPack.filter(monster => monster instanceof Litch))
        .toHaveLength(1);
    });

    it('should contain 1 instance of Demon', () => {
      expect(monstersPack.filter(monster => monster instanceof Demon))
        .toHaveLength(1);
    });

    it('should contain 1 instance of Dragon', () => {
      expect(monstersPack.filter(monster => monster instanceof Dragon))
        .toHaveLength(1);
    });

    it('should contain 2 instances of rare monsters', () => {
      const rareMonsters = monstersPack.filter(rareMonstersFilter);
      expect(rareMonsters).toHaveLength(2);
    });

    it('should contain 2 instances of rare monsters of different kind', () => {
      const rareMonsters = monstersPack.filter(rareMonstersFilter);
      expect(rareMonsters[0].type !== rareMonsters[1].type).toBe(true);
    });

    it('should contain 2 random types of rare monsters', () => {
      const rareCouples: string[] = [];
      
      for (let i = 0; i < 10; i++) {
        const couple = 
          service.getMonstersPack()
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

    it('should eventually output all rare monster types', () => {
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

    it('should be randomly ordered', () => {
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
      expect(variations.every(number => number >= 9)).toBe(true);
    });
  });
});
