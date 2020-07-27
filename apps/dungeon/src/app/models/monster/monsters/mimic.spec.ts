import { Mimic } from './mimic';
import { Monster } from '../monster';
import { ITransformationEffect, TransformerFunction } from '../../models';
import { noEquipHeroStub, oneEquipHeroStub } from '../../mocks';

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

    it('should specify hero as parameter for transformer function', () => {
      expect(startingAction.parameter).toBe('hero');
    });

    it('should specify a transformer function', () => {
      expect(typeof startingAction.transformer).toBe('function');
    });

    describe('transformer function', () => {
      
      let transform: TransformerFunction; 
      let noEquipMimic: Monster;
      let oneEquipMimic: Monster;

      beforeEach(() => {
        transform = startingAction.transformer;
        noEquipMimic = transform(noEquipHeroStub);
        oneEquipMimic = transform(oneEquipHeroStub);
      });
      
      it('should return a Mimic', () => {
        expect(noEquipMimic instanceof Mimic).toBe(true);
        expect(oneEquipMimic instanceof Mimic).toBe(true);
      });

      it('should return a Mimic of baseDamage 0 for hero with no equipment', () => {
        expect(noEquipMimic.baseDamage).toBe(0);
      });

      it('should return a Mimic of baseDamage 1 for hero with 1 equipment', () => {
        expect(oneEquipMimic.baseDamage).toBe(1);
      });
    });
  });
});
