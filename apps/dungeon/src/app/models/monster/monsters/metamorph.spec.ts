import { Metamorph } from './metamorph';
import { Monster } from '../monster';
import { TransformationEffect, TransformerFunction } from '../../models';
import { Goblin } from './goblin';
import { Skeleton } from './skeleton';
import { Orc } from './orc';
import { Vampire } from './vampire';
import { Golem } from './golem';
import { Litch } from './litch';
import { Demon } from './demon';
import { Dracula } from './dracula';
import { Dragon } from './dragon';

describe('Metamorph', () => {
  let metamorph: Metamorph;

  beforeEach(() => {
    metamorph = new Metamorph();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(Metamorph.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(metamorph).toBeTruthy();
  });

  test('it is instance of Metamorph', () => {
    expect(metamorph).toBeInstanceOf(Metamorph);
  });

  test('it is instance of Monster', () => {
    expect(metamorph).toBeInstanceOf(Monster);
  });

  test('it has type "Metamorph"', () => {
    expect(metamorph.type).toBe('Metamorph');
  });

  test('it has baseDamage of null at first', () => {
    expect(metamorph.baseDamage).toBeNull();
  });

  test('it throws error at produceEffect call before adopting form', () => {
    expect(() => { metamorph.produceEffect(); })
      .toThrowError('Metamorph must adopt a new form before attacking');
  });

  describe('startingAction', () => {
    let startingAction: TransformationEffect;
    
    beforeEach(() => {
      startingAction = metamorph.startingAction();
    });
    
    test('is nonnull', () => {
      expect(startingAction).not.toBeNull();
    });
  
    test('is of transformation type', () => {
      expect(startingAction.type).toBe('transformation');
    });

    test('it specifies positionInDungeon as parameter', () => {
      expect(startingAction.parameter).toBe('positionInDungeon');
    });

    test('it specifies a transformer function', () => {
      expect(startingAction.transformer).toBeFunction();
    });

    describe('transformer function', () => {
      let transform: TransformerFunction;

      beforeEach(() => {
        transform = startingAction.transformer;
      });

      test('it throws error for parameter < 1', () => {
        expect(() => transform(0)).toThrowError(
          'Metamorph cannot have a position under 1'
        )
      });

      test('it returns something', () => {
        for (let i = 1; i < 20; i++) {
          expect(transform(i)).toBeTruthy();
        }
      });

      test('it returns an instance of Monster', () => {
        for (let i = 1; i < 20; i++) {
          expect(transform(i)).toBeInstanceOf(Monster);
        }
      });
      
      test('it returns a Goblin for position 1', () => {
        expect(transform(1)).toBeInstanceOf(Goblin);
      });

      test('it returns a Skeleton for position 2', () => {
        expect(transform(2)).toBeInstanceOf(Skeleton);
      });

      test('it returns an Orc for position 3', () => {
        expect(transform(3)).toBeInstanceOf(Orc);
      });

      test('it returns a Vampire for position 4', () => {
        expect(transform(4)).toBeInstanceOf(Vampire);
      });

      test('it returns a Golem for position 5', () => {
        expect(transform(5)).toBeInstanceOf(Golem);
      });

      test('it returns a Litch for position 6', () => {
        expect(transform(6)).toBeInstanceOf(Litch);
      });

      test('it returns a Demon for position 7', () => {
        expect(transform(7)).toBeInstanceOf(Demon);
      });

      test('it returns a Dracula for position 8', () => {
        expect(transform(8)).toBeInstanceOf(Dracula);
      });

      test('it returns a Dragon for position 9', () => {
        expect(transform(9)).toBeInstanceOf(Dragon);
      });

      test('it returns a Metamorph for positions over 9', () => {
        expect(transform(10)).toBeInstanceOf(Metamorph);
        expect(transform(13)).toBeInstanceOf(Metamorph);
      });

      test('it returns a Metamorph of baseDamage 10 for position 10', () => {
        expect(transform(10).baseDamage).toBe(10);
      });

      test('it returns a Metamorph of baseDamage 13 for position 13', () => {
        expect(transform(13).baseDamage).toBe(13);
      });

      test('should produce damage effect if stays as metamorph', () => {
        expect(transform(10).produceEffect()).toEqual({
          type: 'damage',
          amount: 10
        });

        expect(transform(13).produceEffect()).toEqual({
          type: 'damage',
          amount: 13
        });
      });
    });
  });
});
