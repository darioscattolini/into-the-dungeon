import { CommonMonster } from './common-monster';
import { Monster } from './monster';

const MockOrc = class extends CommonMonster {
  constructor() {
    super('Orc', 3);
  }
};

describe('Monster', () => {
  let monster: CommonMonster;

  beforeEach(() => {
    monster = new MockOrc();
  });

  it('should create monster (through MockOrc extension)', () => {
    expect(monster).toBeTruthy();
  });

  it('should create instances of CommonMonster', () => {
    expect(monster instanceof CommonMonster).toBe(true);
  });

  it('should create instances of Monster', () => {
    expect(monster instanceof Monster).toBe(true);
  });

  it('should create instances with definite type', () => {
    expect(monster.type).toBeDefined();
  });

  it('should create instances with definite baseDamage', () => {
    expect(monster.baseDamage).toBeDefined();
  });

  it('should create instances with numeric baseDamage', () => {
    expect(typeof monster.baseDamage).toBe('number');
  });

  it('should create instances with definite actualDamage', () => {
    expect(monster.actualDamage).toBeDefined();
  });

  it('should create instances with actualDamage == baseDamage by default', () => {
    expect(monster.actualDamage).toBe(monster.baseDamage);
  });

  it('should allow to set actualDamage to different value', () => {
    monster.actualDamage = 1;
    expect(monster.actualDamage).toBe(1);
  });

  it('should produceEffect of type damage', () => {
    expect(monster.produceEffect().type).toBe('damage');
  });

  it('should produceEffect of amount equal to actualDamage', () => {
    expect(monster.produceEffect().amount).toBe(3);
    monster.actualDamage = 7;
    expect(monster.produceEffect().amount).toBe(7);
  });

  it('should return a startingAction of null value', () => {
    expect(monster.startingAction()).toBeNull();
  });
});
