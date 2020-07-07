import { Monster } from './monster';

class ConcreteMonster extends Monster {

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
  });
});
