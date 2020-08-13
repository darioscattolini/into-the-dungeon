import { Dracula } from './dracula';
import { Monster } from '../monster';
import { TransformationEffect, TransformerFunction } from '../../models';

describe('Dracula', () => {
  let dracula: Dracula;

  beforeEach(() => {
    dracula = new Dracula();
  });

  test('class has static property maxAmount with value 1', () => {
    expect(Dracula.maxAmount).toBe(1);
  });

  test('instance is created', () => {
    expect(dracula).toBeTruthy();
  });

  test('it is instance of Dracula', () => {
    expect(dracula).toBeInstanceOf(Dracula);
  });

  test('it is instance of Monster', () => {
    expect(dracula).toBeInstanceOf(Monster);
  });

  test('it has type "dracula" when created', () => {
    expect(dracula.type).toEqualCaseInsensitive('dracula');
  });

  test('it has baseDamage of 8 when created', () => {
    expect(dracula.baseDamage).toBe(8);
  });

  test('it throws error at produceEffect call before checking form', () => {
    expect(() => { dracula.produceEffect(); })
      .toThrowError('Dracula must check its form before attacking');
  });

  describe('startingAction', () => {
    let startingAction: TransformationEffect;
    
    beforeEach(() => {
      startingAction = dracula.startingAction();
    });
    
    test('it is nonnull', () => {
      expect(startingAction).not.toBeNull();
    });
  
    test('it is of transformation type', () => {
      expect(startingAction.type).toBe('transformation');
    });

    test('it specifies playersVictories as parameter', () => {
      expect(startingAction.parameter).toBe('playersVictories');
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
          'Players can have only 0 or 1 victories'
        )
      });

      test('it throws error for parameter > 1', () => {
        expect(() => transform(2)).toThrowError(
          'Players can have only 0 or 1 victories'
        )
      });

      test('it returns something', () => {
        expect(transform(1)).toBeTruthy();
      });

      test('it returns a monster', () => {
        expect(transform(0)).toBeInstanceOf(Monster);
        expect(transform(1)).toBeInstanceOf(Monster);
      });
      
      test('it turns into Vampire for players with no victories', () => {
        expect(transform(0).type).toEqualCaseInsensitive('vampire');
      });

      test('it gets baseDamage 8 for players with no victories', () => {
        expect(transform(0).baseDamage).toBe(4);
      });

      test('it stays as Dracula for players with one victory', () => {
        expect(transform(1).type).toEqualCaseInsensitive('dracula');
      });

      test('it keeps baseDamage 8 for players with one victory', () => {
        expect(transform(1).baseDamage).toBe(8);
      });

      test('it can produce Vampire damage effect after checking form', () => {
        expect(transform(0).produceEffect()).toEqual({
          type: 'damage',
          amount: 4
        });
      });

      test('it can produce Dracula damage effect after checking form', () => {
        expect(transform(1).produceEffect()).toEqual({
          type: 'damage',
          amount: 8
        });
      });
    });
  });
});
