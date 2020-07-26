import { Ally } from './ally';
import { Monster } from '../monster';

describe('Ally', () => {
  let ally: Ally;

  beforeEach(() => {
    ally = new Ally();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Ally.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(ally).toBeTruthy();
  });

  it('should create an instance of Ally', () => {
    expect(ally instanceof Ally).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(ally instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Ally"', () => {
    expect(ally.type).toBe('Ally');
  });

  it('should create an instance with baseDamage of null', () => {
    expect(ally.baseDamage).toBe(null);
  });

  it('should produce a companion: ally effect', () => {
    expect(ally.produceEffect()).toEqual({
      type: 'companion',
      companion: 'Ally'
    });
  });
});
