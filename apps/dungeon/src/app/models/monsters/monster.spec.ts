import { Monster } from './monster';

class ConcreteMonster extends Monster {
  constructor() {
    super('Scary');
  }
}

describe('Monster', () => {
  let monster: ConcreteMonster;

  beforeEach(() => {
    monster = new ConcreteMonster();
  });

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
  });
});
