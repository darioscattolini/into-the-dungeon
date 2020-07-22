import { TestBed } from '@angular/core/testing';

import { BiddingService } from './bidding.service';
import { IPlayer } from '../../models/models';

describe('BiddingServiceService', () => {
  let service: BiddingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BiddingService]
    });
    service = TestBed.inject(BiddingService);
  });

  describe('constructor', () => {
    it('should create service', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('startNewRound', () => {
    let chooseHeroSpy: jest.SpyInstance<void, [IPlayer]>;

    beforeEach(() => {
      chooseHeroSpy = jest.spyOn(service, 'chooseHero')
        .mockImplementation((player: IPlayer) => {});
    });

    it('should make starting player choose a hero', () => {
      const stubStartingPlayer: IPlayer = {
        name: 'stub',
        victories: 0,
        defeats: 0,
        surviveDungeon() {},
        dieInDungeon() {}
      }
      service.startNewRound(stubStartingPlayer);
      expect(chooseHeroSpy).toHaveBeenCalledTimes(1);
      expect(chooseHeroSpy).toHaveBeenCalledWith(stubStartingPlayer);
    });
  });

  /*describe('chooseHero', () => {
    it('should retrieve heroes from HeroService', () => {

    })
  });*/

});
