import { Mimic } from './mimic';
import { Monster } from '../monster';
import { ITransformationEffect, TransformerFunction } from '../../models';

describe('Mimic', () => {
  let mimic: Mimic;

  beforeEach(() => {
    mimic = new Mimic();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Mimic.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(mimic).toBeTruthy();
  });

  it('should create an instance of Mimic', () => {
    expect(mimic instanceof Mimic).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(mimic instanceof Monster).toBe(true);
  });
  
  it('should create an instance with type "Mimic"', () => {
    expect(mimic.type).toBe('Mimic');
  });

  it('should create an instance with baseDamage of null at first', () => {
    expect(mimic.baseDamage).toBe(null);
  });

  it('should throw error if trying to produceEffect before mimicking', () => {
    expect(() => { mimic.produceEffect() })
      .toThrowError('Mimic must transform before attacking');
  });

  describe('startingAction', () => {
    let startingAction: ITransformationEffect;
    
    beforeEach(() => {
      startingAction = mimic.startingAction();
    });
    
    it('should be nonnull', () => {
      expect(startingAction).not.toBeNull();
    });
  
    it('should be of transformation type', () => {
      expect(startingAction.type).toBe('transformation');
    });

    it('should specify equipmentSize as parameter for transformer function', () => {
      expect(startingAction.parameter).toBe('equipmentSize');
    });

    it('should specify a transformer function', () => {
      expect(typeof startingAction.transformer).toBe('function');
    });

    describe('transformer function', () => {
      let transform: TransformerFunction;

      beforeEach(() => {
        transform = startingAction.transformer;
      });
      
      it('should return something', () => {
        expect(transform(0)).toBeTruthy();
      });

      it('should return a Mimic', () => {
        expect(transform(0) instanceof Mimic).toBe(true);
      });

      it('should return a Mimic of baseDamage 0 for hero with no equipment', () => {
        expect(transform(0).baseDamage).toBe(0);
      });

      it('should return a Mimic of baseDamage 1 for hero with 1 equipment', () => {
        expect(transform(1).baseDamage).toBe(1);
      });

      it('should return a Mimic that produces a damage effect', () => {
        expect(transform(0).produceEffect()).toEqual({
          type: 'damage',
          amount: 0
        });

        expect(transform(3).produceEffect()).toEqual({
          type: 'damage',
          amount: 3
        });
      });
    });
  });
});
