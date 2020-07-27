import { JellyCube } from './jelly-cube';
import { Monster } from '../monster';

describe('JellyCube', () => {
  let jellyCube: JellyCube;

  beforeEach(() => {
    jellyCube = new JellyCube();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(JellyCube.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(jellyCube).toBeTruthy();
  });

  it('should create an instance of JellyCube', () => {
    expect(jellyCube instanceof JellyCube).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(jellyCube instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Jelly Cube"', () => {
    expect(jellyCube.type).toBe('Jelly Cube');
  });

  it('should create an instance with baseDamage of null', () => {
    expect(jellyCube.baseDamage).toBe(null);
  });

  it('should produce a lose equipment effect', () => {
    expect(jellyCube.produceEffect()).toEqual({
      type: 'equipment',
      lose: 'any'
    });
  });

  it('should have a null startingAction', () => {
    expect(jellyCube.startingAction()).toBeNull();
  });
});
