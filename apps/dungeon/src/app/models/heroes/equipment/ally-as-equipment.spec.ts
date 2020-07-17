import { AllyAsEquipment } from './ally-as-equipment';
import { HeroInterface } from '../hero-interface';
import { Monster } from '../../monsters/monster';

describe('AllyAsEquipment', () => {
  let ally: AllyAsEquipment;
  let allysPosition: number;
  let opponent: HeroInterface;

  beforeEach(() => {
    allysPosition = 2;
    ally = new AllyAsEquipment(allysPosition);
    opponent = {
      equipment: [],
      getDamageModifiers() {
        return {
          first: [],
          second: []
        }
      }
    };
    Monster.clearUncoveredInstances();
  });
  
  it('should create an instance', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance of AllyAsEquipment', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance with name "Ally"', () => {
    expect(ally.name).toBe('Ally');
  });

  it('should create an instance with field available with value true', () => {
    expect(ally.available).toBe(true);
  });

  it('should create an instance with field modifiesDamage with value false', () => {
    expect(ally.modifiesDamage).toBe(false);
  });

  it('can only be used against ally\'s next monster', () => {
    const monster1 = new class extends Monster {} ('Troll', 1, opponent);
    const monster2 = new class extends Monster {} ('Ally', null, opponent);
    const monster3 = new class extends Monster {} ('Troll', 1, opponent);
    const monster4 = new class extends Monster {} ('Orc', 3, opponent);
    
    expect(ally.canBeUsedAgainst(monster1)).toBe(false);
    expect(ally.canBeUsedAgainst(monster2)).toBe(false);
    expect(ally.canBeUsedAgainst(monster3)).toBe(true);
    expect(ally.canBeUsedAgainst(monster4)).toBe(false);
  });

  it('should be discarded after ally\'s next monster', () => {
    const monster1 = new class extends Monster {} ('Troll', 1, opponent);
    const monster2 = new class extends Monster {} ('Ally', null, opponent);
    const monster3 = new class extends Monster {} ('Troll', 1, opponent);
    expect(ally.canBeUsedAgainst(monster3)).toBe(true);
    expect(ally.available).toBe(true);
    
    const monster4 = new class extends Monster {} ('Orc', 3, opponent);
    expect(ally.canBeUsedAgainst(monster4)).toBe(false);
    expect(ally.available).toBe(false);
  });
});
