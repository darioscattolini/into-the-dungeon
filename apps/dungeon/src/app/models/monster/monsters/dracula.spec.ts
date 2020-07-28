import { Dracula } from './dracula';
import { Monster } from '../monster';
import { ITransformationEffect, TransformerFunction } from '../../models';

describe('Dracula', () => {
  let dracula: Dracula;

  beforeEach(() => {
    dracula = new Dracula();
  });

  it('should have static property maxAmount with value 1', () => {
    expect(Dracula.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(dracula).toBeTruthy();
  });

  it('should create an instance of Dracula', () => {
    expect(dracula instanceof Dracula).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(dracula instanceof Monster).toBe(true);
  });

  it('should create an instance with type "Vampire"', () => {
    expect(dracula.type).toBe('Vampire');
  });

  it('should create an instance with baseDamage of 4 at first', () => {
    expect(dracula.baseDamage).toBe(4);
  });

  it('should throw error if trying to produceEffect before checking form', () => {
    expect(() => { dracula.produceEffect(); })
      .toThrowError('Dracula must check its form before attacking');
  });

  describe('startingAction', () => {
    let startingAction: ITransformationEffect;
    
    beforeEach(() => {
      startingAction = dracula.startingAction();
    });
    
    it('should be nonnull', () => {
      expect(startingAction).not.toBeNull();
    });
  
    it('should be of transformation type', () => {
      expect(startingAction.type).toBe('transformation');
    });

    it('should specify playersVictories as parameter for transformer function', () => {
      expect(startingAction.parameter).toBe('playersVictories');
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
        expect(transform(1)).toBeTruthy();
      });
      
      it('should stay as Vampire for players with no victories', () => {
        expect(transform(0).type).toBe('Vampire');
      });

      it('should stay with baseDamage 4 for players with no victories', () => {
        expect(transform(0).baseDamage).toBe(4);
      });

      it('should return a Dracula for players with one victory', () => {
        expect(transform(1).type).toBe('Dracula');
      });

      it('should return a Dracula of baseDamage 8 for players with one victory', () => {
        expect(transform(1).baseDamage).toBe(8);
      });

      it('should produce damage effect after checking form', () => {
        expect(transform(0).produceEffect()).toEqual({
          type: 'damage',
          amount: 4
        });

        expect(transform(1).produceEffect()).toEqual({
          type: 'damage',
          amount: 8
        });
      });
    });
  });
});
