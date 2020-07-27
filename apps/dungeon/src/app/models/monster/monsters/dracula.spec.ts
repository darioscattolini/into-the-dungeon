import { Dracula } from './dracula';
import { Monster } from '../monster';
import { ITransformationEffect, Player } from '../../models';

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

    it('should specify player as parameter for transformer function', () => {
      expect(startingAction.parameter).toBe('player');
    });

    it('should specify a transformer function', () => {
      expect(typeof startingAction.transformer).toBe('function');
    });

    describe('transformer function', () => {
      let noVictoryDracula: Monster;
      let oneVictoryDracula: Monster;

      beforeEach(() => {
        const noVictoryPlayer = new Player('no victory');
        const oneVictoryPlayer = new Player('one victory');
        oneVictoryPlayer.surviveDungeon();
        noVictoryDracula = new Dracula()
          .startingAction()
          .transformer(noVictoryPlayer);
        oneVictoryDracula = new Dracula()
          .startingAction()
          .transformer(oneVictoryPlayer);
      });
      
      it('should stay the same for players with no victories', () => {
        expect(noVictoryDracula.type).toBe('Vampire');
        expect(noVictoryDracula.baseDamage).toBe(4);
      });

      it('should return a Dracula for players with one victory', () => {
        expect(oneVictoryDracula.type).toBe('Dracula');
      });

      it('should return a Dracula of baseDamage 8 for players with one victory', () => {
        expect(oneVictoryDracula.baseDamage).toBe(8);
      });

      it('should produce damage effect after checking form', () => {
        expect(noVictoryDracula.produceEffect()).toEqual({
          type: 'damage',
          amount: 4
        });

        expect(oneVictoryDracula.produceEffect()).toEqual({
          type: 'damage',
          amount: 8
        });
      });
    });
  });
});
