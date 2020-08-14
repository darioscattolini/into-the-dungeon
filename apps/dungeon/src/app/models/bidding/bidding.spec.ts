import { Bidding } from './bidding';
import { Player, Hero, Monster } from '../models';
import { oneEquipHeroStub } from '../../mocks/hero.mocks';
import { MockMonster } from '../../mocks/monster.mocks';
import { BidResponse, MonsterAdditionResponse, EquipmentRemovalResponse } from './bidding-actions';
import { equipmentStub } from '../../mocks/equipment.mocks';

const bidStub: BidResponse = { type: 'bid', content: true };
const addMonsterStub: MonsterAdditionResponse = { 
  type: 'add monster', content: true 
};
const removeEquipmentStub: EquipmentRemovalResponse = { 
  type: 'remove equipment', content: equipmentStub
};

describe('Bidding', () => {
  let biddingPlayers: Player[];
  let startingPlayer: Player;
  let defeatedPlayer: Player;
  let hero: Hero;
  let monstersPack: Monster[];
  let bidding: Bidding

  beforeEach(() => {
    biddingPlayers = [new Player('3rd'), new Player('1st'), new Player('2nd')];
    defeatedPlayer = new Player('not bidding');
    biddingPlayers[0].nextPlayer = biddingPlayers[1];
    biddingPlayers[1].nextPlayer = biddingPlayers[2];
    biddingPlayers[2].nextPlayer = defeatedPlayer;
    defeatedPlayer.nextPlayer = biddingPlayers[0];
    startingPlayer = biddingPlayers[1];
    hero = oneEquipHeroStub;
    monstersPack = [new MockMonster(), new MockMonster()];
    bidding = new Bidding(biddingPlayers, startingPlayer, hero, monstersPack);
  });

  describe('initial state', () => {
    test('bidding players are the ones passed as ctor argument', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is startingPlayer passed as ctor argument', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as ctor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is monstersPack ctor argument length', () => {
      expect(bidding.monstersPackSize).toBe(monstersPack.length);
    });

    test('monstersInDungeonAmount is 0', () => {
      expect(bidding.monstersInDungeonAmount).toBe(0);
    });

    test('bidding goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('turn is active', () => {
      expect(bidding.activeTurn).toBeTrue();
    });

    test('demandNextRequest returns bid request to starting player', () => {
      expect(bidding.demandNextRequest()).toEqual({
        type: 'bid', player: startingPlayer, content: null
      });
    });

    test.each([
      [bidStub], [addMonsterStub], [removeEquipmentStub]
    ])('onResponse cannot be called', (response) => {
      expect(() => { bidding.onResponse(response); })
        .toThrowError('A user action must be previously requested.');
    });

    test('endTurn cannot be called', () => {
      expect(() => { bidding.endTurn(); })
        .toThrowError(`${startingPlayer.name} is still playing.`);
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });
  });

  describe('first bid request demanded', () => {
    beforeEach(() => {
      bidding.demandNextRequest();
    });

    test('bidding players are the ones passed as ctor argument', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is startingPlayer passed as ctor argument', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as ctor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is monstersPack ctor argument length', () => {
      expect(bidding.monstersPackSize).toBe(monstersPack.length);
    });

    test('monstersInDungeonAmount is 0', () => {
      expect(bidding.monstersInDungeonAmount).toBe(0);
    });

    test('bidding goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('turn is active', () => {
      expect(bidding.activeTurn).toBeTrue();
    });

    test('demandNextRequest cannot be called right after', () => {
      expect(() => { bidding.demandNextRequest() })
        .toThrowError('A user response to a previous request is pending.');
    });

    test('onResponse can be called with BidResponse', () => {
      expect(() => { bidding.onResponse(bidStub); })
        .not.toThrow();
    });

    test('onResponse cannot be called with MonsterAdditionResponse', () => {
      expect(() => { bidding.onResponse(addMonsterStub); })
        .toThrowError('A response of "bid" type was expected.');
    });

    test('onResponse cannot be called with EquipmentRemovalResponse', () => {
      expect(() => { bidding.onResponse(removeEquipmentStub); })
        .toThrowError('A response of "bid" type was expected.');
    });

    test('endTurn cannot be called', () => {
      expect(() => { bidding.endTurn(); })
        .toThrowError(`${startingPlayer.name} is still playing.`);
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });

    describe('bid accepted', () => {
      beforeEach(() => {
        bidding.onResponse({ type: 'bid', content: true });
      });

      test('bidding players are the ones passed as ctor argument', () => {
        expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
      });
  
      test('current player is startingPlayer passed as ctor argument', () => {
        expect(bidding.currentPlayer).toBe(startingPlayer);
      });
  
      test('hero is the one passed as ctor argument', () => {
        expect(bidding.hero).toBe(hero);
      });
  
      test('monstersPackSize is monstersPack ctor argument length', () => {
        expect(bidding.monstersPackSize).toBe(monstersPack.length);
      });
  
      test('monstersInDungeonAmount is 0', () => {
        expect(bidding.monstersInDungeonAmount).toBe(0);
      });
  
      test('bidding goes on', () => {
        expect(bidding.goesOn).toBeTrue();
      });
  
      test('turn is active', () => {
        expect(bidding.activeTurn).toBeTrue();
      });
      
      test('demandNextRequest returns MonsterAdditionRequest', () => {
        expect(bidding.demandNextRequest().type).toBe('add monster');
      });

      test('demandNextRequest returns request targeting current player', () => {
        expect(bidding.demandNextRequest().player).toBe(bidding.currentPlayer);
      });

      test('demandNextRequest returns request with last monster in pack', () => {
        expect(bidding.demandNextRequest().content).toBe(monstersPack.pop());
      });
  
      test.each([
        [bidStub], [addMonsterStub], [removeEquipmentStub]
      ])('onResponse cannot be called', (response) => {
        expect(() => { bidding.onResponse(response); })
          .toThrowError('A user action must be previously requested.');
      });
  
      test('endTurn cannot be called', () => {
        expect(() => { bidding.endTurn(); })
          .toThrowError(`${startingPlayer.name} is still playing.`);
      });
  
      test('getResult cannot be called', () => {
        expect(() => { bidding.getResult(); })
          .toThrowError('Bidding phase has not ended yet.');
      });
    });

    describe('withdraw', () => {
      beforeEach(() => {
        bidding.onResponse({ type: 'bid', content: false });
      });

      test('bidding players does not contain startingPlayer anymore', () => {
        expect(bidding.biddingPlayers).toIncludeSameMembers([
          biddingPlayers[0], biddingPlayers[2]
        ]);
      });
  
      test('current player is startingPlayer passed as ctor argument', () => {
        expect(bidding.currentPlayer).toBe(startingPlayer);
      });
  
      test('hero is the one passed as ctor argument', () => {
        expect(bidding.hero).toBe(hero);
      });
  
      test('monstersPackSize is monstersPack ctor argument length', () => {
        expect(bidding.monstersPackSize).toBe(monstersPack.length);
      });
  
      test('monstersInDungeonAmount is 0', () => {
        expect(bidding.monstersInDungeonAmount).toBe(0);
      });
  
      test('bidding goes on', () => {
        expect(bidding.goesOn).toBeTrue();
      });
  
      test('whitdrawers turn is not active anymore', () => {
        expect(bidding.activeTurn).toBeFalse();
      });
      
      test('demandNextRequest cannot be called before ending turn', () => {
        expect(() => { bidding.demandNextRequest() })
          .toThrowError('Call to endTurn necessary before requesting action.');
      });
  
      test.each([
        [bidStub], [addMonsterStub], [removeEquipmentStub]
      ])('onResponse cannot be called', (response) => {
        expect(() => { bidding.onResponse(response); })
          .toThrowError('A user action must be previously requested.');
      });
  
      test('endTurn can be called', () => {
        expect(() => { bidding.endTurn(); })
          .not.toThrow();
      });
  
      test('getResult cannot be called', () => {
        expect(() => { bidding.getResult(); })
          .toThrowError('Bidding phase has not ended yet.');
      });
    });
  });
});
