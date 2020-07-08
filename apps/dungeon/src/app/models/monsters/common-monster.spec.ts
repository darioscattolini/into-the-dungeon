import { CommonMonster } from './common-monster';
import { Hero } from '../heroes/hero';
import { Monster } from './monster';

describe('CommonMonster', () => {
  let opponent: Hero;
  let commonMonster: CommonMonster;

  beforeEach(() => {
    opponent = new class extends Hero {
      constructor() { super([]); }
    };

    commonMonster = new class extends CommonMonster {
      constructor() {
        super("Common Monster", 3, opponent)
      }
    }
  });

  it('should create an instance', () => {
    expect(commonMonster).toBeTruthy();
  });

  it('should create an instance of Monster class', () => {
    expect(commonMonster instanceof Monster).toEqual(true);
  });
});
