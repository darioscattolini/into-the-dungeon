import { TestBed } from '@angular/core/testing';

import { BiddingServiceService } from './bidding-service.service';

describe('BiddingServiceService', () => {
  let service: BiddingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiddingServiceService);
  });

  describe('constructor', () => {
    it('should create service', () => {
      expect(service).toBeTruthy();
    });
  });
});
