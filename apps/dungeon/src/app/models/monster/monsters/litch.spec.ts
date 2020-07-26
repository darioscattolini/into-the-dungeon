import { Litch } from './litch';
import { Monster } from '../monster';

describe('Litch', () => {
  let litch: Litch;

  beforeEach(() => {
    litch = new Litch();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Litch.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(litch).toBeTruthy();
  });

  it('should create an instance of Litch', () => {
    expect(litch instanceof Litch).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(litch instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Litch"', () => {
    expect(litch.type).toBe('Litch');
  });

  it('should create an instance with baseDamage of 6', () => {
    expect(litch.baseDamage).toBe(6);
  });
});
