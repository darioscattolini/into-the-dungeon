import { Bidding } from './bidding';
import { Player, Hero, Monster } from '../models';
import { oneEquipHeroStub } from '../../mocks/hero.mocks';
import { MockMonster } from '../../mocks/monster.mocks';
import { BidResponse, MonsterAdditionResponse, EquipmentRemovalResponse, BiddingActionResponse } from './bidding-actions';

const bidStub: BidResponse = { type: 'bid', content: true };
const addMonsterStub: MonsterAdditionResponse = { 
  type: 'add monster', content: true 
};
const removeEquipmentStub: EquipmentRemovalResponse = { 
  type: 'remove equipment', content: true 
};

describe('Bidding', () => {
  let biddingPlayers: Player[];
  let startingPlayer: Player;
  let hero: Hero;
  let monstersPack: Monster[];
  let bidding: Bidding

  beforeEach(() => {
    biddingPlayers = [new Player('1'), new Player('2'), new Player('3')];
    biddingPlayers[0].nextPlayer = biddingPlayers[1];
    biddingPlayers[1].nextPlayer = biddingPlayers[2];
    biddingPlayers[2].nextPlayer = biddingPlayers[0];
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

    test('demandNextRequest returns bid request to starting player', () => {
      expect(bidding.demandNextRequest()).toEqual({
        type: 'bid', player: startingPlayer, content: null
      });
    });
  }); 
});
