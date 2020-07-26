import { Orc } from './orc';
import { Monster } from '../monster';

describe('Orc', () => {
  let orc: Orc;

  beforeEach(() => {
    orc = new Orc();
  });

  it('should have static property maxAmount with value 2', () => {
    expect(Orc.maxAmount).toBe(2);
  });

  it('should create an instance', () => {
    expect(orc).toBeTruthy();
  });

  it('should create an instance of Orc', () => {
    expect(orc instanceof Orc).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(orc instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Orc"', () => {
    expect(orc.type).toBe('Orc');
  });

  it('should create an instance with baseDamage of 3', () => {
    expect(orc.baseDamage).toBe(3);
  });
});
