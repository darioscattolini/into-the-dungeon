import { Metamorph } from './metamorph';
import { Monster } from '../monster';
import { ITransformationEffect, TransformerFunction } from '../../models';
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

  it('should have static property maxAmount with value 1', () => {
    expect(Metamorph.maxAmount).toBe(1);
  });

  it('should create an instance', () => {
    expect(metamorph).toBeTruthy();
  });

  it('should create an instance of Metamorph', () => {
    expect(metamorph instanceof Metamorph).toBe(true);
  });

  it('should create an instance of Monster', () => {
    expect(metamorph instanceof Monster).toBe(true);
  });

  it('should create an instance with type "Metamorph"', () => {
    expect(metamorph.type).toBe('Metamorph');
  });

  it('should create an instance with baseDamage of null at first', () => {
    expect(metamorph.baseDamage).toBe(null);
  });

  it('should throw error if trying to produceEffect before adopting form', () => {
    expect(() => { metamorph.produceEffect(); })
      .toThrowError('Metamorph must adopt a new form before attacking');
  });

  describe('startingAction', () => {
    let startingAction: ITransformationEffect;
    
    beforeEach(() => {
      startingAction = metamorph.startingAction();
    });
    
    it('should be nonnull', () => {
      expect(startingAction).not.toBeNull();
    });
  
    it('should be of transformation type', () => {
      expect(startingAction.type).toBe('transformation');
    });

    it('should specify positionInDungeon as parameter for transformer function', () => {
      expect(startingAction.parameter).toBe('positionInDungeon');
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
        expect(transform(2)).toBeTruthy();
      });
      
      it('should return a Goblin for position 1', () => {
        expect(transform(1) instanceof Goblin).toBe(true);
      });

      it('should return a Skeleton for position 2', () => {
        expect(transform(2) instanceof Skeleton).toBe(true);
      });

      it('should return an Orc for position 3', () => {
        expect(transform(3) instanceof Orc).toBe(true);
      });

      it('should return a Vampire for position 4', () => {
        expect(transform(4) instanceof Vampire).toBe(true);
      });

      it('should return a Golem for position 5', () => {
        expect(transform(5) instanceof Golem).toBe(true);
      });

      it('should return a Litch for position 6', () => {
        expect(transform(6) instanceof Litch).toBe(true);
      });

      it('should return a Demon for position 7', () => {
        expect(transform(7) instanceof Demon).toBe(true);
      });

      it('should return a Dracula for position 8', () => {
        expect(transform(8) instanceof Dracula).toBe(true);
      });

      it('should return a Dragon for position 9', () => {
        expect(transform(9) instanceof Dragon).toBe(true);
      });

      it('should return a Metamorph for positions over 9', () => {
        expect(transform(10) instanceof Metamorph).toBe(true);
        expect(transform(13) instanceof Metamorph).toBe(true);
      });

      it('should return a Metamorph of baseDamage 10 for position 10', () => {
        expect(transform(10).baseDamage).toBe(10);
      });

      it('should return a Metamorph of baseDamage 13 for position 13', () => {
        expect(transform(13).baseDamage).toBe(13);
      });

      it('should produce damage effect if stays as metamorph', () => {
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
