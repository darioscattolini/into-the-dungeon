import { Demon } from './demon';
import { Monster } from '../monster';

describe('Demon', () => {
  let demon: Demon;

  beforeEach(() => {
    demon = new Demon();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Demon.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(demon).toBeTruthy();
  });

  it('should create an instance of Demon', () => {
    expect(demon instanceof Demon).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(demon instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Demon"', () => {
    expect(demon.type).toBe('Demon');
  });

  it('should create an instance with baseDamage of 7', () => {
    expect(demon.baseDamage).toBe(7);
  });
});
