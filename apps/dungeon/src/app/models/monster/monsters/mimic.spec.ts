import { Mimic } from './mimic';
import { Monster } from '../monster';
import { TransformationEffect, TransformerFunction } from '../../models';

describe('Mimic', () => {
  let mimic: Mimic;

  beforeEach(() => {
    mimic = new Mimic();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(Mimic.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(mimic).toBeTruthy();
  });

  test('it is instance of Mimic', () => {
    expect(mimic).toBeInstanceOf(Mimic);
  });

  test('it is instance of Monster', () => {
    expect(mimic).toBeInstanceOf(Monster);
  });
  
  test('it has type "mimic"', () => {
    expect(mimic.type).toEqual('mimic');
  });

  test('it has baseDamage of null at first', () => {
    expect(mimic.baseDamage).toBeNull();
  });

  test('it throws error at attempt to produceEffect before mimicking', () => {
    expect(() => { mimic.produceEffect() })
      .toThrowError('Mimic must transform before attacking');
  });

  describe('startingAction', () => {
    let startingAction: TransformationEffect;
    
    beforeEach(() => {
      startingAction = mimic.startingAction();
    });
    
    test('it is nonnull', () => {
      expect(startingAction).not.toBeNull();
    });
  
    test('it is of transformation type', () => {
      expect(startingAction.type).toBe('transformation');
    });

    test('it specifies equipmentSize as parameter', () => {
      expect(startingAction.parameter).toBe('equipmentSize');
    });

    test('it specifies a transformer function', () => {
      expect(startingAction.transformer).toBeFunction();
    });

    describe('transformer function', () => {
      let transform: TransformerFunction;

      beforeEach(() => {
        transform = startingAction.transformer;
      });

      test('it throws error for parameter < 0', () => {
        expect(() => transform(-1)).toThrowError(
          'Players cannot have less than 0 pieces of equipment'
        )
      });

      test('it throws error for parameter > 6', () => {
        expect(() => transform(7)).toThrowError(
          'Players cannot have more than 6 pieces of equipment'
        )
      });

      test('it returns something', () => {
        expect(transform(0)).toBeTruthy();
      });

      test('it returns a Mimic', () => {
        expect(transform(0)).toBeInstanceOf(Mimic);
      });

      test('it gets damage equal to parameter value', () => {
        for (let i = 1; i <= 6; i++) {
          expect(transform(i).baseDamage).toBe(i);
        }
      });

      test('it returns a Mimic that produces a damage effect', () => {
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
