import { Bidding } from './bidding';
import { Player, Hero, Monster, NotificationRequest } from '../models';
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
    test('bidding players are the ones passed as constructor argument', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is startingPlayer passed as constructor argument', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as constructor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is monstersPack constructor argument length', () => {
      expect(bidding.monstersPackSize).toBe(monstersPack.length);
    });

    test('monstersInDungeonAmount is 0', () => {
      expect(bidding.monstersInDungeonAmount).toBe(0);
    });

    test('bidding goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('current players turn is active', () => {
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
        .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
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

    test('bidding players are still the initial ones', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is still startingPlayer', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as constructor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is still monstersPack ctor argument length', () => {
      expect(bidding.monstersPackSize).toBe(monstersPack.length);
    });

    test('monstersInDungeonAmount is still 0', () => {
      expect(bidding.monstersInDungeonAmount).toBe(0);
    });

    test('bidding still goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('currentPlayers turn is still active', () => {
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
        .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });
  });

  describe('1st bid request accepted', () => {
    beforeEach(() => {
      bidding.demandNextRequest();
      bidding.onResponse({ type: 'bid', content: true });
    });

    test('bidding players are still the initial ones', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is still startingPlayer', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as constructor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is still monstersPack ctor argument length', () => {
      expect(bidding.monstersPackSize).toBe(monstersPack.length);
    });

    test('monstersInDungeonAmount is still 0', () => {
      expect(bidding.monstersInDungeonAmount).toBe(0);
    });

    test('bidding still goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('currentPlayers turn is still active', () => {
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
        .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });
  });

  describe('1st bid MonsterAddition demanded', () => {
    let previousPackSize: number;

    beforeEach(() => {
      previousPackSize = bidding.monstersPackSize;

      bidding.demandNextRequest();
      bidding.onResponse({ type: 'bid', content: true });
      bidding.demandNextRequest();
    });

    test('bidding players are still the initial ones', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is still startingPlayer', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as constructor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is now one monster shorter', () => {
      expect(bidding.monstersPackSize).toBe(previousPackSize - 1);
    });

    test('monstersInDungeonAmount is still 0', () => {
      expect(bidding.monstersInDungeonAmount).toBe(0);
    });

    test('bidding still goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('currentPlayers turn is still active', () => {
      expect(bidding.activeTurn).toBeTrue();
    });

    test('demandNextRequest cannot be called right after', () => {
      expect(() => { bidding.demandNextRequest() })
        .toThrowError('A user response to a previous request is pending.');
    });

    test('onResponse cannot be called with BidResponse', () => {
      expect(() => { bidding.onResponse(bidStub); })
        .toThrowError('A response of "add monster" type was expected.');
    });

    test('onResponse can be called with MonsterAdditionResponse', () => {
      expect(() => { bidding.onResponse(addMonsterStub); })
        .not.toThrow();
    });

    test('onResponse cannot be called with EquipmentRemovalResponse', () => {
      expect(() => { bidding.onResponse(removeEquipmentStub); })
        .toThrowError('A response of "add monster" type was expected.');
    });

    test('endTurn cannot be called', () => {
      expect(() => { bidding.endTurn(); })
        .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });
  });

  describe('1st bid MonsterAddition accepted', () => {
    let previousPackSize: number;
    let previouslyInDungeon: number;

    beforeEach(() => {
      previousPackSize = bidding.monstersPackSize;
      previouslyInDungeon = bidding.monstersInDungeonAmount;

      bidding.demandNextRequest();
      bidding.onResponse({ type: 'bid', content: true });
      bidding.demandNextRequest();
      bidding.onResponse({ type: 'add monster', content: true });
    });

    test('bidding players are still the initial ones', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is still startingPlayer', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as constructor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is still one monster shorter', () => {
      expect(bidding.monstersPackSize).toBe(previousPackSize - 1);
    });

    test('monstersInDungeonAmount is now one monster larger', () => {
      expect(bidding.monstersInDungeonAmount).toBe(previouslyInDungeon + 1);
    });

    test('bidding still goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('current players turn is not active anymore', () => {
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

    test('endTurn can now be called', () => {
      expect(() => { bidding.endTurn(); })
        .not.toThrow();
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });

    describe('end of turn', () => {
      let notificationRequest: NotificationRequest<null>;

      beforeEach(() => {
        notificationRequest = bidding.endTurn();
      });

      test('bidding players are still the initial ones', () => {
        expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
      });
  
      test('current player is startingPlayers next bidding player', () => {
        expect(bidding.currentPlayer).toBe(biddingPlayers[2]);
      });
  
      test('hero is the one passed as constructor argument', () => {
        expect(bidding.hero).toBe(hero);
      });
  
      test('monstersPackSize is still one monster shorter', () => {
        expect(bidding.monstersPackSize).toBe(previousPackSize - 1);
      });
  
      test('monstersInDungeonAmount is still one monster larger', () => {
        expect(bidding.monstersInDungeonAmount).toBe(previouslyInDungeon + 1);
      });
  
      test('bidding still goes on', () => {
        expect(bidding.goesOn).toBeTrue();
      });
  
      test('current players turn is active', () => {
        expect(bidding.activeTurn).toBeTrue();
      });
  
      test('demandNextRequest returns bid request to current player', () => {
        expect(bidding.demandNextRequest()).toEqual({
          type: 'bid', player: bidding.currentPlayer, content: null
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
          .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
      });
  
      test('getResult cannot be called', () => {
        expect(() => { bidding.getResult(); })
          .toThrowError('Bidding phase has not ended yet.');
      });

      test('method returns notification request targeting currentPlayer', () => {
        expect(notificationRequest.player).toBe(bidding.currentPlayer);
      });

      test('method returns notification informing of next turn', () => {
        expect(notificationRequest.notification).toEqual({
          content: 'It is your turn.',
          extra: null
        });
      });
    });
  });

  describe('1st bid MonsterAddition rejected', () => {
    let previousPackSize: number;
    let previouslyInDungeon: number;

    beforeEach(() => {
      previousPackSize = bidding.monstersPackSize;
      previouslyInDungeon = bidding.monstersInDungeonAmount;

      bidding.demandNextRequest();
      bidding.onResponse({ type: 'bid', content: true });
      bidding.demandNextRequest();
      bidding.onResponse({ type: 'add monster', content: false });
    });

    test('bidding players are still the initial ones', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is still startingPlayer', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as ctor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is still one monster shorter', () => {
      expect(bidding.monstersPackSize).toBe(previousPackSize - 1);
    });

    test('monstersInDungeonAmount is still the starting one', () => {
      expect(bidding.monstersInDungeonAmount).toBe(previouslyInDungeon);
    });

    test('bidding still goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('current players turn is still active', () => {
      expect(bidding.activeTurn).toBeTrue();
    });
    
    test('demandNextRequest returns EquipmentRemovalRequest', () => {
      expect(bidding.demandNextRequest().type).toBe('remove equipment');
    });

    test('demandNextRequest returns request targeting current player', () => {
      expect(bidding.demandNextRequest().player).toBe(bidding.currentPlayer);
    });

    test('demandNextRequest returns request with hero\'s equipment', () => {
      expect(bidding.demandNextRequest().content)
        .toIncludeSameMembers(bidding.hero.equipment);
    });

    test.each([
      [bidStub], [addMonsterStub], [removeEquipmentStub]
    ])('onResponse cannot be called', (response) => {
      expect(() => { bidding.onResponse(response); })
        .toThrowError('A user action must be previously requested.');
    });

    test('endTurn cannot be called', () => {
      expect(() => { bidding.endTurn(); })
        .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });
  });
  
  describe('1st bid EquipmentRemoval demanded', () => {
    let previousPackSize: number;

    beforeEach(() => {
      previousPackSize = bidding.monstersPackSize;

      bidding.demandNextRequest();
      bidding.onResponse({ type: 'bid', content: true });
      bidding.demandNextRequest();
      bidding.onResponse({ type: 'add monster', content: false });
      bidding.demandNextRequest();
    });

    test('bidding players are still the initial ones', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is still startingPlayer', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as constructor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is now one monster shorter', () => {
      expect(bidding.monstersPackSize).toBe(previousPackSize - 1);
    });

    test('monstersInDungeonAmount is still 0', () => {
      expect(bidding.monstersInDungeonAmount).toBe(0);
    });

    test('bidding still goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('currentPlayers turn is still active', () => {
      expect(bidding.activeTurn).toBeTrue();
    });

    test('demandNextRequest cannot be called right after', () => {
      expect(() => { bidding.demandNextRequest() })
        .toThrowError('A user response to a previous request is pending.');
    });

    test('onResponse cannot be called with BidResponse', () => {
      expect(() => { bidding.onResponse(bidStub); })
        .toThrowError('A response of "remove equipment" type was expected.');
    });

    test('onResponse cannot be called with MonsterAdditionResponse', () => {
      expect(() => { bidding.onResponse(addMonsterStub); })
        .toThrowError('A response of "remove equipment" type was expected.');
    });

    test('onResponse can be called with EquipmentRemovalResponse', () => {
      expect(() => { bidding.onResponse(removeEquipmentStub); })
        .not.toThrow();
    });

    test('endTurn cannot be called', () => {
      expect(() => { bidding.endTurn(); })
        .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });
  });

  describe('1st bid EquipmentRemoval', () => {
    let previousPackSize: number;
    let previouslyInDungeon: number;

    beforeEach(() => {
      previousPackSize = bidding.monstersPackSize;
      previouslyInDungeon = bidding.monstersInDungeonAmount;

      bidding.demandNextRequest();
      bidding.onResponse({ type: 'bid', content: true });
      bidding.demandNextRequest();
      bidding.onResponse({ type: 'add monster', content: false });
      bidding.demandNextRequest();
      bidding.onResponse({ type: 'remove equipment', content: equipmentStub });
    });

    test('bidding players are still the initial ones', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
    });

    test('current player is still startingPlayer', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as constructor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is still one monster shorter', () => {
      expect(bidding.monstersPackSize).toBe(previousPackSize - 1);
    });

    test('monstersInDungeonAmount is still the initial amount', () => {
      expect(bidding.monstersInDungeonAmount).toBe(previouslyInDungeon);
    });

    test('bidding still goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('current players turn is not active anymore', () => {
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

    test('endTurn can now be called', () => {
      expect(() => { bidding.endTurn(); })
        .not.toThrow();
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });

    describe('end of turn', () => {
      let notificationRequest: NotificationRequest<null>;

      beforeEach(() => {
        notificationRequest = bidding.endTurn();
      });

      test('bidding players are still the initial ones', () => {
        expect(bidding.biddingPlayers).toIncludeSameMembers(biddingPlayers);
      });
  
      test('current player is startingPlayers next bidding player', () => {
        expect(bidding.currentPlayer).toBe(biddingPlayers[2]);
      });
  
      test('hero is the one passed as constructor argument', () => {
        expect(bidding.hero).toBe(hero);
      });
  
      test('monstersPackSize is still one monster shorter', () => {
        expect(bidding.monstersPackSize).toBe(previousPackSize - 1);
      });
  
      test('monstersInDungeonAmount is still the initial amount', () => {
        expect(bidding.monstersInDungeonAmount).toBe(previouslyInDungeon);
      });
  
      test('bidding still goes on', () => {
        expect(bidding.goesOn).toBeTrue();
      });
  
      test('current players turn is active', () => {
        expect(bidding.activeTurn).toBeTrue();
      });
  
      test('demandNextRequest returns bid request to current player', () => {
        expect(bidding.demandNextRequest()).toEqual({
          type: 'bid', player: bidding.currentPlayer, content: null
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
          .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
      });
  
      test('getResult cannot be called', () => {
        expect(() => { bidding.getResult(); })
          .toThrowError('Bidding phase has not ended yet.');
      });

      test('method returns notification request targeting currentPlayer', () => {
        expect(notificationRequest.player).toBe(bidding.currentPlayer);
      });

      test('method returns notification informing of next turn', () => {
        expect(notificationRequest.notification).toEqual({
          content: 'It is your turn.',
          extra: null
        });
      });
    });
  });

  describe('1st bid request rejected (withdraw)', () => {
    beforeEach(() => {
      bidding.demandNextRequest();
      bidding.onResponse({ type: 'bid', content: false });
    });

    test('bidding players does not contain startingPlayer anymore', () => {
      expect(bidding.biddingPlayers).toIncludeSameMembers([
        biddingPlayers[0], biddingPlayers[2]
      ]);
    });

    test('current player is still startingPlayer', () => {
      expect(bidding.currentPlayer).toBe(startingPlayer);
    });

    test('hero is the one passed as constructor argument', () => {
      expect(bidding.hero).toBe(hero);
    });

    test('monstersPackSize is still the initial one', () => {
      expect(bidding.monstersPackSize).toBe(monstersPack.length);
    });

    test('monstersInDungeonAmount is still 0', () => {
      expect(bidding.monstersInDungeonAmount).toBe(0);
    });

    test('bidding still goes on', () => {
      expect(bidding.goesOn).toBeTrue();
    });

    test('withdrawing players turn is not active anymore', () => {
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

    test('endTurn can now be called', () => {
      expect(() => { bidding.endTurn(); })
        .not.toThrow();
    });

    test('getResult cannot be called', () => {
      expect(() => { bidding.getResult(); })
        .toThrowError('Bidding phase has not ended yet.');
    });

    describe('end of turn', () => {
      let notificationRequest: NotificationRequest<null>;

      beforeEach(() => {
        notificationRequest = bidding.endTurn();
      });

      test('bidding players does not contain startingPlayer anymore', () => {
        expect(bidding.biddingPlayers).toIncludeSameMembers([
          biddingPlayers[0], biddingPlayers[2]
        ]);
      });
  
      test('current player is startingPlayers next bidding player', () => {
        expect(bidding.currentPlayer).toBe(biddingPlayers[2]);
      });
  
      test('hero is the one passed as constructor argument', () => {
        expect(bidding.hero).toBe(hero);
      });
  
      test('monstersPackSize is still the initial one', () => {
        expect(bidding.monstersPackSize).toBe(monstersPack.length);
      });
  
      test('monstersInDungeonAmount is still 0', () => {
        expect(bidding.monstersInDungeonAmount).toBe(0);
      });
  
      test('bidding still goes on', () => {
        expect(bidding.goesOn).toBeTrue();
      });
  
      test('current players turn is active', () => {
        expect(bidding.activeTurn).toBeTrue();
      });
  
      test('demandNextRequest returns bid request to current player', () => {
        expect(bidding.demandNextRequest()).toEqual({
          type: 'bid', player: bidding.currentPlayer, content: null
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
          .toThrowError(`${bidding.currentPlayer.name} is still playing.`);
      });
  
      test('getResult cannot be called', () => {
        expect(() => { bidding.getResult(); })
          .toThrowError('Bidding phase has not ended yet.');
      });

      test('method returns notification request targeting currentPlayer', () => {
        expect(notificationRequest.player).toBe(bidding.currentPlayer);
      });

      test('method returns notification informing of next turn', () => {
        expect(notificationRequest.notification).toEqual({
          content: 'It is your turn.',
          extra: null
        });
      });
    });
  });
});
