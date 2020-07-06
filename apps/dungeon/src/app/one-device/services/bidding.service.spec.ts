import { TestBed } from '@angular/core/testing';

import { BiddingService } from './bidding.service';
import { Player } from '../../models/player';

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
    let chooseHeroSpy: jest.SpyInstance<void, [Player]>;

    beforeEach(() => {
      chooseHeroSpy = jest.spyOn(service, 'chooseHero')
        .mockImplementation((player: Player) => {});
    });

    it('should make starting player choose a hero', () => {
      const startingPlayer = new Player('John');
      service.startNewRound(startingPlayer);
      expect(chooseHeroSpy).toHaveBeenCalledTimes(1);
      expect(chooseHeroSpy).toHaveBeenCalledWith(startingPlayer);
    });
  });
});
