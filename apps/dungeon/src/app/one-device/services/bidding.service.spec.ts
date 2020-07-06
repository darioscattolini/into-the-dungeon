import { TestBed } from '@angular/core/testing';

import { BiddingService } from './bidding.service';

describe('BiddingServiceService', () => {
  let service: BiddingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiddingService);
  });

  describe('constructor', () => {
    it('should create service', () => {
      expect(service).toBeTruthy();
    });
  });
});
